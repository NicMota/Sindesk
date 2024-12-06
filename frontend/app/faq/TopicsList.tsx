'use client'
import { useState } from "react"
import SearchBar from "./SearchBar"

export default function TopicsList({topics})
{
    const [topicsList,setTopics] = useState<Array<Object>>(topics);
    const[page,setPage] = useState(1);
    const topicPerPage = 4;

    const startIndex = (page-1) * topicPerPage;
    const endIndex = startIndex + topicPerPage;

    const currentTopics = topicsList.slice(startIndex,endIndex);
    const totalPages = Math.ceil(topicsList.length/topicPerPage);

    function previousPage()
    {
        if(page>=2)
            setPage(page=>page-1)
    }
    function nextPage()
    {
        if(page<totalPages)
            setPage(page=>page+1)
    }

    return(
        <>  
             <span className="text-amber-950 font-serif text-3xl px-2">
                        <p> Pesquise o nome do tópico desejado</p>
            </span>
            <SearchBar setTopics={setTopics} topics={topics}/>
            <div className="topicos flex flex-col gap-y-3">      
                {currentTopics.map((topic,index)=>{
                return (
                    <Topic key={index} topic={topic}/>
                )})
            }
            </div>
            {
                totalPages>1&&
       
                <div className="pagination flex justify-between">
                    <button className="rounded-xl bg-amber-400 p-2 min-w-fit w-24 font-serif font-bold text-amber-900 duration-300 transition-all hover:bg-black hover:text-amber-100 " onClick={previousPage}>previous</button>
                    <button className='rounded-xl bg-amber-400 p-2 min-w-fit w-24 font-serif font-bold text-amber-900 duration-300 transition-all hover:bg-black hover:text-amber-100' onClick={nextPage}>next</button>
                </div>
            }
        </>
    )
}
function Topic({topic})
{
    return(
        <a href={`/faq/topic/${topic.id}`} className="bg-amber-300 border border-amber-800 w-96 cursor-pointer rounded-2xl capitalize font-bold text-amber-800 p-2 m-auto w-full font-serif">
            <p>
                {topic.title}
            </p>
        </a>
    )
}