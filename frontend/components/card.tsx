'use client'
import { useSession } from "next-auth/react"
import { GoogleSignin } from "./input"
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context";

export function LoginCard() 
{

    return(
        <div className="flex flex-col m-auto ">  
            <div className=" flex mx-auto h-full p-10 flex-col gap-y-6  ">
                <h1 className="text-5xl font-serif uppercase font-bold"> BEM VINDO AO SINDESK. </h1> 
                <div className="m-auto w-4/5 flex flex-col items-center gap-y-4">
                    <GoogleSignin/>
                    <a href='/login' className="bg-amber-400 border-white border rounded-2xl text-black font-bold capitalize text-center p-2 w-full hover:border-black hover:bg-black hover:text-white transition-all duration-300"> Login </a>
                </div>
            </div>
        </div>
    )
}
export function EmailCard()
{
    
}