'use client'
import { useAuth } from "@/app/context";
import { NumberInput, SubmitButton, TextArea, TextInput } from "@/components/input";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { tags_array} from "./utils";
import _ from 'lodash';
import TagsSection from "../admin/components/TagsSection";
export function TicketForm() 
{   
    const {user} = useAuth(); 
    const router = useRouter();
    const [tags, setTags] = useState(tags_array);
    const [selected, setSelected] = useState([]);
    async function handleSubmit(e:any)
    {   
        e.preventDefault()
        try {
            const formData = new FormData(e.currentTarget);
            const enum_array = selected.map((element)=>element.enum_name);
            const ticket = {
                subject:formData.get("subject"),
                description:formData.get("description"),
                tags:enum_array,
                sender:user.id
            }
            const token = getCookie("token");
            console.log(ticket);
            const {status,data} = await axios.post("http://localhost:8080/api/ticket",ticket,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            if(status===201){
                toast.success('ticket enviado com sucesso');
                router.replace("/dashboard");
                router.refresh();
                
            }else 
                return toast.error('erro no envio do ticket')
        } catch (error) {
            console.log(error.message)
            return toast.error(error.message)
        }
    }

    return (
        <>

            <form className="my-10 h-fit border-4 bg-zinc-100  border-amber-400 rounded p-2 mx-auto gap-y-4 flex flex-col" onSubmit={handleSubmit}>
            
                <TextInput name={'subject'} label={'Assunto:'}/>
                <TextArea name={'description'} label={'Descrição:'}/>
                <TagsSection selected={selected} setSelected={setSelected} tags={tags} setTags={setTags}/>
                <SubmitButton/>
            </form>
        </>
    )
}



