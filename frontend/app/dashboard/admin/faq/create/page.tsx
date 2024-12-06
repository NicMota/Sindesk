
import { Layout } from "@/components/layout";
import {Editor} from '@tinymce/tinymce-react';
import { useRef } from "react";
import FaqForm from "./form";
export default function Page()
{
    return(
        <Layout>
            <div className="w-full grow  h-full  flex flex-col relative bg-amber-200 ">
                <span className="flex  w-full text-amber-900 font-serif  py-10 ">
                    <p className="font-bold text-4xl m-auto">Criação de Artigos para a página de Faq</p>
                </span>
                <FaqForm/>
            </div>
        </Layout>
    )
}
