import { Footer, Layout } from "@/components/layout";

export default function Aboutus() {
    return (
        <Layout>
            <div className="bg-amber-50 flex flex-col w-full min-h-screen">
                {/* Primeira div: ocupa até o espaço restante no main */}
                <div className="flex flex-row grow h-[calc(100vh-4rem)] justify-center">
                        <span className="mx-4 w-3/5 min-h-96 items-center bg-amber-100  border-2 border-amber-900 rounded p-4 break-words flex font-serif self-center">
                            <p className="text-amber-800 text-2xl">
                                A Singed é uma empresa inovadora especializada no desenvolvimento de soluções tecnológicas para suporte e atendimento ao cliente. Fundada por Nicolas José Mota, Rafael Sato Myauti e Mateus Vitor de Oliveira, a companhia tem como principal produto o Sindesk, uma plataforma de help desk projetada para simplificar e otimizar a resolução de problemas enfrentados por usuários em diversas áreas, como compras online. Com foco em eficiência, segurança e experiência do usuário, a Singed busca transformar a maneira como empresas e clientes se conectam, oferecendo suporte ágil e de qualidade.
                            </p>
                        </span>
                        <div className="mb-8 flex bg-[url('./aboutus/SINGED.svg')] bg-no-repeat bg-contain bg-center w-2/5"/>

                 
                </div>

                {/* Segunda div: ocupa exatamente o tamanho de uma tela */}
                <div className="h-screen flex bg-indigo-50 items-center justify-center gap-x-6 py-4">
                    <ImageCard />
                    <ImageCard />
                    <ImageCard />
                </div>
            </div>
            <Footer/>
        </Layout>
    );
}

function ImageCard() {
    return (
        <div className="w-96 m-auto h-96 bg-amber-200">
            {/* Conteúdo do Card */}
        </div>
    );
}
