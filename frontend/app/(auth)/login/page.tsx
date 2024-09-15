
import { GoogleSignin, SubmitButton, TextInput } from "@/components/input";
import { Layout } from "@/components/layout";

import { signIn, useSession } from "next-auth/react";
import {  redirect, useRouter } from "next/navigation";
import { LoginForm } from "./loginForm";
import { getServerSession } from "next-auth";




export default async function Login()
{   
  
    const session = await getServerSession();
    if (session) 
        redirect('/dashboard')
   
    
    return( 
        <Layout>
            <div className="w-full bg-indigo-500 h-full flex">
                <div className="  w-2/5 h-2/3 rounded bg-slate-100 border-2 border-amber-500 flex flex-col m-auto ">
                    <div className="m-auto flex gap-x-4">
                        <GoogleSignin/>     
                    </div>
                 
                    <LoginForm/>
                    <a href="/register" className="m-auto underline capitalize text-sm text-amber-700">Não tem uma conta? Clique aqui para se registrar</a>
                </div>
                    
            </div>
        </Layout>
    )
}

