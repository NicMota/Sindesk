'use client'
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useEffect, useState } from "react";
import admin from './admin.svg';
import Image from "next/image";
import TicketsPanel from "./components/TicketPanel";
import { UsersPanel } from "./components/UsersPanel";
import { panelOptions } from "./util";
import FaqPanel from "./components/FaqPanel";

export const AdminPanel = ({faq_topics,users,tickets,closed,pending,open})=>
{
    const [selected,setSelected] = useState('tickets');

    return(
        <div className="flex grow h-full bg-amber-500">
            <div className="flex flex-col block bg-amber-600 w-16  text-thin font-serif capitalize *:cursor-pointer text-white ">
                {panelOptions.map((opt,ind)=>(
                    <p key={ind} className="bg-amber-800 text-amber-100 even:bg-amber-200 even:text-amber-950 even:hover:bg-amber-500 even:hover:text-amber-200 h-16 flex hover:bg-amber-500 hover:text-black items-center justify-center" onClick={()=>setSelected(opt)}>{opt}</p>
                ))}
        
            </div>
          
            <div className="flex flex-col h-full w-1/2 bg-amber-100 border-r-2 p-2 border-amber-800">
                <div className="flex text-black gap-x-2 items-between m-2 justify-around">
                    <div className="border rounded border-black h-36 w-36 flex flex-col items-center"> <h1 className="text-center font-serif capitalize text-2xl">tickets abertos</h1><h1 className="text-amber-500 font-bold text-4xl">{open}</h1></div>
                    <div className="border rounded border-black h-36 w-36 flex flex-col items-center"> <h1 className="text-center font-serif capitalize text-2xl">tickets pendentes</h1><h1 className="text-amber-500 font-bold text-4xl">{pending}</h1></div>
                    <div className="border rounded border-black h-36 w-36 flex flex-col items-center"> <h1 className="text-center font-serif capitalize text-2xl">tickets fechados</h1><h1 className="text-amber-500 font-bold text-4xl">{closed}</h1></div>
                </div>
              
                {selected==='tickets'&&<TicketsPanel tickets={tickets}/> || selected==='users'&& <UsersPanel users={users}/> || selected==='FAQ'&& <FaqPanel faq_topics={faq_topics}/>}
                
            </div>
            <div className="flex grow  bg-no-repeat justify-center items-end">
                <Image alt='admin image' src={admin} className="w-5/6"/>
            </div>
               

           
            
        </div>
    )
}

