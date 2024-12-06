'use client';

import { tags_array } from '@/app/dashboard/create/utils';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import TagsSection from '../../components/TagsSection';

const tinymce_config = {
    height: 300,
    menubar: false,
    plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
    ],
    content_css:false,
    setup: (editor) => {
        editor.on('init', () => {
            editor.getDoc().body.style.backgroundColor = '#fef3c7'; // Cor de fundo
            editor.getDoc().body.style.color = '#333';
            // Cor do texto
        });
    },
    toolbar:
        'undo redo | formatselect | bold italic backcolor fontsizeinput | \
         alignleft aligncenter alignright alignjustify | \
         bullist numlist outdent indent | removeformat | \
         h1 h2 h3 hr help'
};
const promise_msg = {
    loading:'criando topico...',
    success:'topico criado',
    error:'erro na criacao do topico'
}
export default function FaqForm() {
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    const [selected,setSelected] = useState([]);
    const [tags,setTags] = useState(tags_array);
    async function handleSubmit(e)
    {
        e.preventDefault();
        const enum_array = selected.map((select) => select.enum_name);
        const topic_obj = {
            title:title,
            description:description,
            tags:enum_array
        }
        console.log(topic_obj)
        try{
            const {status,data} = await toast.promise(axios.post("http://localhost:8080/api/topic",topic_obj),promise_msg);
        }catch(error)
        {
            console.error("Error creating topic:", error);
            toast.error("Failed to create topic");
        }
        
       
    }
    return (
        <form className="bg-indigo-950 m-auto rounded h-fit px-4 py-2 w-2/3 gap-y-4 flex flex-col" onSubmit={(e)=>handleSubmit(e)}>
            <label className='text-amber-400 font-serif font-bold text-2xl'>Titulo:</label>
            <input className=" text-2xl px-2 rounded text-amber-950 bg-amber-100 border border-amber-900 font-serif" onChange={(e)=>setTitle(e.target.value)}type="text" />

            <Editor apiKey='31b3y1xr1pdfkq2kth1z7pyfdq7l6tsq2uwgkq26t6mkodjg' init={tinymce_config} onEditorChange={(content)=>setDescription(content)}/>
            
            <TagsSection tags={tags} setTags={setTags} selected={selected} setSelected={setSelected}/>

            <button type='submit'  className='bg-amber-400 size-fit rounded-2xl p-2 font-serif text-amber-800 mx-auto text-xl px-4 capitalize hover:bg-black hover:text-amber-100 duration-300 transition-all'>
                Enviar
            </button>
        </form>
    );
}