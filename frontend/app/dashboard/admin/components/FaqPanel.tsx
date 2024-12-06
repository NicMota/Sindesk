export default function FaqPanel({faq_topics})
{
    return(
        <div className="bg-amber-200 flex flex-col gap-y-4 h-fit p-4  my-auto m-2">
            <span className="font-serif text-amber-900 p-2 flex flex-col">
                <p className="text-3xl text-center">
                    Painel de Controle do Faq
                </p>
            </span>
            <div className="flex grow">
                <a href='/dashboard/admin/faq/create' className="bg-amber-400 rounded-2xl size-fit p-2 text-xl font-serif text-amber-800 font-bold hover:bg-black hover:text-amber-100 duration-300 transition-all mx-auto">Criar Tópico</a>
            </div>
        </div>
    )
}