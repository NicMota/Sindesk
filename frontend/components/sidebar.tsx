'use client'
import Hamburger from "hamburger-react"
import { useState } from "react"
import Image from "next/image";
import logo from '@/public/images/logo.svg';

import { useAuth } from "@/app/context";


export const Sidebar = ({logged} : {logged:boolean}) =>
{
    const [open,setOpen] = useState(false);
    
    
    return (
        <div className="z-40">
                <div className="z-40 relative h-max flex  items-center p-2">
                    {/* <Hamburger rounded color='white' size={30} direction='right' toggled={open} toggle={()=>setOpen(!open)}/> */}
                    <a href='/' className="object-fill self-center">
                        <Image
                        src={logo}
                        width={200}
                        height={100}
                        alt="logo"
                        />
                    </a>
                   
                </div>
               

                {/* <div className={`${open? 'translate-x-30' : '-translate-x-full'}  flex absolute top-0 left-0 w-1/4 h-screen bg-indigo-500 border-r-2 border-black transition-all`}>
                   <div className="flex absolute flex-col gap-y-8 top-24 w-full font-serif">
                        {!logged?(
                            <>
                                 <a href='/register' className="m-auto cursor-pointer rounded-2xl font-bold text-xl bg-amber-300 text-black p-1 capitalize w-2/3 text-center hover:bg-black hover:text-white transition-all duration-300">registra-se</a> 
                                 <a href='/login' className="m-auto cursor-pointer rounded-2xl font-bold text-xl bg-amber-300 text-black p-1 capitalize w-2/3 text-center hover:bg-black hover:text-white transition-all duration-300">logar</a>  
                            </>
                        )
                           :
                        (

                            <>
                                <a href='/dashboard'  className="m-auto cursor-pointer rounded-2xl font-bold text-xl bg-amber-300 text-black p-1 capitalize w-2/3 text-center hover:bg-black hover:text-white transition-all duration-300" >meus tickets </a>
                                <a href='/dashboard/create' className="m-auto cursor-pointer rounded-2xl font-bold text-xl bg-amber-300 text-black p-1 capitalize w-2/3 text-center hover:bg-black hover:text-white transition-all duration-300">criar ticket</a> 
                            </>
                        )
                            
                        }

                   </div>
                </div> */}
        </div>
    )



}
