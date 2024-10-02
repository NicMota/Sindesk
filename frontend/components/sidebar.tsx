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
                <div className="z-40 relative h-max flex items-center p-2">
                    <Hamburger rounded color='white' size={30} direction='right' toggled={open} toggle={()=>setOpen(!open)}/>
                    <a href='/' className="object-fill">
                        <Image
                        src={logo}
                        width={200}
                        height={100}
                        alt="logo"
                        />
                    </a>
                   
                </div>
               

                <div className={`${open? 'translate-x-30' : '-translate-x-full'}  flex absolute top-0 left-0 h-screen w-1/4 bg-indigo-900 transition-all`}>
                   <div className="flex absolute flex-col gap-y-8 top-24 w-full ">
                        {!logged?(
                            <>
                                 <a href='/login' className="m-auto cursor-pointer rounded-2xl font-bold text-xl bg-amber-400 text-black p-1 capitalize w-2/3 text-center hover:bg-black hover:text-white transition-all duration-300">logar</a>  
                            </>
                        )
                           :
                        (

                            <>
                                <a href='/dashboard'  className="m-auto cursor-pointer rounded-2xl font-bold text-xl bg-amber-400 text-black p-1 capitalize w-2/3 text-center hover:bg-black hover:text-white transition-all duration-300" >dashboard </a>
                            </>
                        )
                            
                        }

                   </div>
                </div>
        </div>
    )



}
