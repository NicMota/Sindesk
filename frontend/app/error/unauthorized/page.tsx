import { Layout } from "@/components/layout";

export default function Page()
{
    return(
        <Layout>
            <div className="w-full h-screen top-0 absolute flex bg-red-700">
                <div className="bg-amber-50 size-fit flex m-auto p-4 rounded">
                    <span className="font-serif text-center flex flex-col gap-y-4">
                        <p className="text-4xl text-red-500 font-extrabold"> Você Não Está Autorizado!!!</p>
                        <a href='/' className="text-xl text-red-800 underline ">retorne a página inicial</a>
                    </span>
                </div>
            </div>
        </Layout>
    )
}