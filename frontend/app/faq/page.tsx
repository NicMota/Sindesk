'use server'
import { Footer, Layout } from "@/components/layout";
import { useState } from "react";
import TopicsList from "./TopicsList";
import SearchBar from "./SearchBar";
import axios from "axios";

export default async function Faq(){

   const {data:topics} = await axios.get("http:localhost:8080/api/topic");
    return(
        <Layout >
            <div className="flex flex-col grow absolute top-0 ">
                <div className="w-full h-screen bg-amber-100 flex">
                    <div className="w-3/5 flex p-4 bg-amber-300">
                        <span className="m-auto flex gap-y-4  flex-col text-amber-900 font-bold font-serif">
                            <p className="text-4xl text-amber-700  text-center">FAQ</p>
                            <p className="text-2xl font-thin text-center">Aqui você encontra respostas para as dúvidas mais comuns sobre nossos serviços. Navegue pelas perguntas ou use a busca para encontrar o que precisa. Se não achar o que procura, nossa equipe está à disposição para ajudar!</p>
                        </span>
                    </div>
                    <div className="flex w-2/5  bg-[url('./faq/faq.svg')] bg-no-repeat bg-contain bg-center"/>
              
                 
                    
                </div>
                <div className="w-full h-screen flex flex-col justify-center bg-indigo-400">
                    <div className=" flex flex-col gap-y-4 bg-indigo-200 p-4 my-4  w-4/5 h-fit place-self-center self-center  rounded">
                        <TopicsList topics={topics}/>
                    </div>
                </div>
                <Footer/>
            </div>
                
        </Layout>
    )
}

