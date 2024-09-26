'use client'
import { NumberInput, SubmitButton, TextArea, TextInput } from "@/components/input";
import axios from "axios";
import toast from "react-hot-toast";

export function TicketForm() 
{   
    async function handleSubmit(e:any)
    {
        e.preventDefault()
        try {
            const formData = new FormData(e.currentTarget);
            const ticket = {
                subject:formData.get("subject"),
                description:formData.get("description"),
                status:"active"
            }
            const {status,data} = await axios.post("http://localhost:8080/api/ticket",ticket);

            if(status===201)
                return toast.success('ticket enviado com sucesso');
            else 
                return toast.error('erro no envio do ticket')
        } catch (error) {
            console.log(error.message)
            return toast.error(error.message)
        }
    }

    return (
        <>

            <form className="my-10 mx-auto gap-y-4 flex flex-col" onSubmit={handleSubmit}>
                <TextInput name={'subject'} label={'Assunto:'}/>
                <TextArea name={'description'} label={'Descrição:'}/>
                <NumberInput name={'importancia'} label={'O quanto esse problema te atrapalha de 1 a 10:'}/>
                <SubmitButton/>
            </form>
        </>
    )
}