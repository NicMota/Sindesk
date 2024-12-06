'use client'

import axios from "axios";
import Error from "next/error";
import { useState } from "react"
import toast from "react-hot-toast";
const toastMessage = {
    success:"Resultado Encontrado",
    loading:"Procurando...",
    error:"Nenhum resultado encontrado"
}
export default function SearchBar(props)
{   
    const [search,setSearch] = useState('');

    async function handleSubmit(e)
    {
        e.preventDefault();
        await toast.promise(axios.get("http://localhost:8080/api/topic/title/" + search).then(result=>{
            if(result.data.length===0)
                throw Error;
            props.setTopics(result.data);
        }),toastMessage);
    }
    function handleChange(e)
    {
        setSearch(e.target.value.toLowerCase());
    }
    
    return(
        <div className="flex gap-x-4 w-full">
            <input className='bg-amber-50  w-full rounded-2xl p-1 outline-none text-amber-950 px-2 text-2xl' onChange={(e) => handleChange(e)} type="text"/>
            <button className="bg-amber-400 text-amber-900  font-serif font-bold rounded-2xl p-2 hover:bg-black hover:text-white duration-300 transition-all" onClick={(e)=>handleSubmit(e)}>pesquisar</button>
        </div>
    )
}