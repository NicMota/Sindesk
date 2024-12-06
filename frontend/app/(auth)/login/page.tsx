'use session'
import { GoogleSignin, SubmitButton, TextInput } from "@/components/input";
import { Layout } from "@/components/layout";

import { signIn, useSession } from "next-auth/react";
import {  redirect, useRouter } from "next/navigation";
import { LoginForm } from "./loginForm";
import { getServerSession } from "next-auth";
import { getAuthServer } from "@/app/actions";




export default async function Login()
{   
  
    const session = await getAuthServer();
    if (session) 
        redirect('/dashboard')
   
    
    return( 
        <Layout>
            <div className="w-full bg-indigo-700 h-full flex">
                <div className="size-fit p-8 rounded-2xl bg-indigo-100 border-2 border-amber-500 flex flex-col m-auto ">
                    <LoginForm/>
                    
                </div>
                    
            </div>
        </Layout>
    )
}

