'use session'
import { SubmitButton, TextInput } from "@/components/input";
import { Layout } from "@/components/layout";
import { useFormState } from "react-dom";


import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { getAuthServer } from "@/app/actions";
import { RegisterForm } from "./registerForm";
import sindesk from './SINDESK.svg';
import Image from "next/image";

export default async function Register()
{
    const session = await getAuthServer();
    if(session)
        redirect('/dashboard');


    return( 
        <Layout>
            <div className="w-full h-full flex ">

            
                <div className=" bg-amber-200 p-5 w-3/5 flex flex-col ">
                    <RegisterForm/>
                </div>
                <div className="flex-1 py-4 bg-indigo-500 justify-center flex w-2/5">
                    <Image className="max-w-full h-auto " alt='sindesk' src={sindesk}/>
                </div>
            </div>
        </Layout>
    )
}

