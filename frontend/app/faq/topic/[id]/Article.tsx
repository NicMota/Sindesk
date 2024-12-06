'use client'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react';
import { convertDatetime } from '@/app/dashboard/tickets/[id]/util';
export default function Article({topic}){
    
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Garante que o código só será executado no cliente
    }, []);

    if (!isClient) {
        return <p className='text-amber-900 font-serif text-xl'>Carregando...</p>; 
    }
    return(
        <span className="relative font-serif text-amber-800  pb-8 overflow-y-auto h-full max-w-full flex flex-col gap-y-4">
            <p className="font-bold text-4xl">
                {topic.title}
            </p>
            <p> {convertDatetime(topic.createdAt)}</p>
            <p className="text-2xl break-words max-w-full overflow-auto max-h-full y-2 ">
                {parse(topic.description)}
            </p> 
            <p className="capitalize text-xl absolute px-2 text-amber-700 underline font-thin bottom-0 left-0 ">tags: <i className='lowercase'>{[...topic.tags]}</i></p>
        </span>
    )
}
 
