'use server'
import { Footer, Layout } from "@/components/layout";
import axios from "axios";
import DOMPurify from 'dompurify';
import { title } from "process";
import Article from "./Article";
export default async function Topic({params}:{params:{id:number}})
{   
    const {data:topic} = await axios.get('http://localhost:8080/api/topic/' + params.id);
    
    
    const {data:related} = await axios.get('http://localhost:8080/api/topic/tags/' + topic.tags.toString());

    return(
        <Layout>
            
            <div className="flex flex-col h-full p-4 bg-indigo-950">
                <div className="flex rounded-2xl min-h-full bg-amber-100 size-full  ">
                    <div className="w-2/3 bg-amber-200 p-2 border-amber-900 p-4  border-r-2 h-full max-h-full overflow-y-auto">
                        <Article topic={topic}/>
                    </div>
                    <div className="w-1/3 bg-amber-800 flex flex-col text-right">
                        <span className=" m-4 font-serif flex gap-y-4 flex-col ">
                            <p className="font-bold text-3xl text-amber-100">Links Relacionados:</p>
                            {related.map((r,i)=>    {
                                if(r.id != topic.id)
                                    return(<a className='underline text-xl text-amber-50' href={`/faq/topic/${r.id}`}>{r.title}</a> )
                                
                                 
                                      
                            })}
                       
                        </span>
                    </div>
                </div>
            </div>
            
        </Layout>
    )
}