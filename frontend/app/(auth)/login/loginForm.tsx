'use client'
import { TextInput, SubmitButton } from "@/components/input"
import axios from "axios";
import { signIn } from "next-auth/react";
import { setConfig } from "next/config";
import {setCookie} from 'cookies-next'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { set } from "zod";
export const LoginForm = () =>
{   
    const router = useRouter(); 

    const handleSubmit = async (e : any) =>
    {   
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
       
        try {
            const data_object = {
                email:formData.get('email'),
                password:formData.get('senha')
            }
            const {status,data} = await axios.post("http://localhost:8080/api/auth/login",data_object) 
                if(status === 200)
                {   
                    setCookie('token',data.token);
                    toast.success("Loggin Succesfull");
                    router.replace('/dashboard');
                    router.refresh();
                }
                 
        } catch (error) {
            console.log(error.message)
            toast.error("loggin insuccesfull")
        }
    }
    return (
        <form className="flex flex-col  m-auto  gap-y-2" method="post" onSubmit={handleSubmit}>
            <TextInput name={'email'} label={'E-mail:'} />
            <TextInput name={'senha'} label={'Senha:'} />
            <SubmitButton/>            
        </form>
    )
}