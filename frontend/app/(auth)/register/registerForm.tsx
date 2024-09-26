'use client'

import { TextInput, SubmitButton, PasswordInput } from "@/components/input"
import axios from "axios";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";

export const RegisterForm = () =>
{

    const router = useRouter();
    async function handleSubmit (e:any)
    {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            const data_object = {
                login:formData.get('usuario'),
                email:formData.get('email'),
                number:formData.get('telefone'),
                password:formData.get('senha'),
                status:"COMMON"
            }
            const {status,data} = await axios.post('http://localhost:8080/api/auth/register',data_object);
            
            if(status === 200 || status === 201)
            {
                toast.success("registrado com sucesso");
                router.replace('/login');
                router.refresh();
            }
               
            

     
        } catch (err) {
            if (err.response && err.response.status === 400) {
                toast.error("Email já existe");
            } else {
                toast.error("Erro no registro");
            }
        }
    }
    return (
        <form className="flex flex-col m-auto gap-y-2" onSubmit={handleSubmit}>
            <TextInput name={'email'} label={'E-mail:'} />
            <TextInput name={'usuario'} label={'Usuário:'} />
            <PasswordInput name={'senha'} label={'Senha:'} />
            <PasswordInput name={'confirmar_senha'} label={'Confirme a Senha:'} />
            <TextInput name={'telefone'} label={'Número de celular:'} />

            <SubmitButton/>
        </form>
    )
}