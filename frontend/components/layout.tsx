import { Navbar } from "./navbar";

export const Layout = async ({children}) =>
{   
    return (
        <div className="w-full h-full flex flex-col">
            <div className={`bg-indigo-950 h-screen max-h-screen flex flex-col z-40 `}>
                <Navbar/>
                <main className="flex-1">
                    {children} 
                </main>
            </div>
            <Footer/>
        </div>
    )
}
export const Footer = () =>
{
    return(
        <div className="w-full font-semibold bg-slate-900 text-amber-100 min-h-24 flex flex-row gap-x-4 px-4  ">
                <div className="flex flex-row gap-x-8 self-center ">
                    <a href="/aboutus" className="underline"> Sobre nós </a> 
                    <a href='/faq' className="underline"> FAQ</a>
                    <p className="font-light"> ©Singed 2024</p>
                </div>
        </div>
    )
}