import { Layout } from "@/components/layout";

export default function Page()
{
    return(
        <Layout>
            <div className="w-full h-screen top-0 absolute flex bg-indigo-700">
                <div className="bg-amber-50 size-fit w-1/2 flex m-auto p-4 rounded">
                    <span className="font-serif text-center flex flex-col gap-y-4">
                        <p className="text-4xl text-indigo-700 font-semibold capitalize"> Verifique o seu email para acessar essa página !!!</p>
                        <a href='/' className="text-xl text-indigo-500 underline ">retorne a página inicial</a>
                    </span>
                </div>
            </div>
        </Layout>
    )
}