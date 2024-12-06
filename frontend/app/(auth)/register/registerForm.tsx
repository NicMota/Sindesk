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
                confirm_password:formData.get('confirmar_senha'),
                role:"COMMON"
            }
            if(data_object.password != data_object.confirm_password)
            {
                toast.error("senhas n coincidem");
                return;
            }
            
            const {status,data} = await toast.promise(axios.post('http://localhost:8080/api/auth/register',data_object),
            {
                loading: 'registrando...',
                success: 'registrado com sucesso',
                error: 'erro no registro'
            });
            
            
            if(status === 200 || status === 201)
            {
                router.replace('/verify');
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
        <form className="flex flex-col m-auto  gap-y-2 bg-indigo-500 rounded p-6 border border-black" onSubmit={handleSubmit}>
            <TextInput name={'email'} label={'E-mail:'} />
            <TextInput name={'usuario'} label={'Usuário:'} />
            <PasswordInput name={'senha'} label={'Senha:'} />
            <PasswordInput name={'confirmar_senha'} label={'Confirme a Senha:'} />
            <TextInput name={'telefone'} label={'Número de celular:'} />
            <SubmitButton/>
        </form>
    )
}