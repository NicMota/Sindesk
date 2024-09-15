'use client'

import { TextInput, SubmitButton } from "@/components/input"
import axios from "axios";

import toast from "react-hot-toast";

export const RegisterForm = () =>
{
    async function handleSubmit (e:any)
    {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const {status,data} = await axios.post('/api/register',formData);
            
            if(status === 200)
                return toast.success(data.message);

            
            return toast.error(data.message);
        } catch (err) {
            
        }
    }
    return (
        <form className="flex flex-col m-auto gap-y-2" onSubmit={handleSubmit}>
            <TextInput name={'email'} label={'E-mail:'} />
            <TextInput name={'usuario'} label={'Usuário:'} />
            <TextInput name={'senha'} label={'Senha:'} />
            <TextInput name={'confirmar_senha'} label={'Confirme a Senha:'} />
            <TextInput name={'telefone'} label={'Número de celular:'} />

            <SubmitButton/>
        </form>
    )
}