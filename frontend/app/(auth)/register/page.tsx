'use session'
import { SubmitButton, TextInput } from "@/components/input";
import { Layout } from "@/components/layout";
import { useFormState } from "react-dom";


import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { RegisterForm } from "./registerForm";


export default async function Register()
{
    const session = await getServerSession();
    if(session)
        redirect('/dashboard');


    return( 
        <Layout>
         
                <div className=" bg-slate-300 p-5 w-3/4  h-screen flex flex-col">
                    <RegisterForm/>
                </div>
                   
     
        </Layout>
    )
}

