'use client'
import { TextInput, SubmitButton } from "@/components/input"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export const LoginForm = () =>
{   
    const router = useRouter(); 
    const handleSubmit = async (e : any) =>
    {   
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        try {
            const signInResponse = await signIn("credentials",
                {
                    email:data.get('email'),
                    password:data.get('senha'),
                    redirect:false
                }
            )
            if(!signInResponse?.error)
            {
                router.replace('/dashboard');
                router.refresh();
            }
            if(!signInResponse.ok)
                throw new Error('deu bo')


            toast.success("Loggin Succesfull");
        
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