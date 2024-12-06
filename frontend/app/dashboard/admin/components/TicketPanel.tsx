import { useRouter } from "next/navigation";

const TicketsPanel = ({tickets}) =>
{   
    
    return(
        <>
            <div className="h-1/4 flex border-black text-5xl my-4 font-thin text-center py-auto text-black">
                <p className="m-auto">Tickets</p>
            </div>
            <div className="flex flex-col grow overflow-auto bg-amber-950 border-2 border-black">
                <TicketsTable tickets={tickets}/>
            </div>
        </>
    )
}

function TicketsTable({tickets}){
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('pt-BR', {
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit', 
            hour: '2-digit', 
            minute: '2-digit',
        }).format(date);
       
    };
    const router = useRouter();
    function redirect(id){
        router.push('/dashboard/admin/tickets/'+id)      
    }
    return(
        <table className='border-collapse text-left'>
            <thead className=" bg-amber-800 *:text-amber-200  border-black border-b-2 sticky top-0 text-black">
                <tr className=""><th>Status</th><th>Assunto</th><th>Solicitante</th><th>Data</th><th>prioridade</th></tr>
            </thead>
            <tbody className="bg-amber-200">
                {tickets.map((e, i) => (
                    <tr key={i} onClick={()=>{redirect(e.id)}} className="transition-all duration-200 odd:bg-amber-500 space-x-4 text-black *:py-1 border-black  border-y-2 hover:bg-amber-800 hover:text-amber-200 font-serif font-bold cursor-pointer">
                    
                        <td><p className="break-words  max-w-32  w-20 overflow-auto">{e.status}</p></td>
                        <td><p className="break-words  max-w-96  w-48 overflow-auto">{e.subject}</p></td>
                        <td><p className="break-words  max-w-96  w-48 overflow-auto">{e.sender.login}</p></td>
                        <td><p className="break-words  max-w-52  w-48 overflow-auto">{formatDate(e.createdAt)}</p></td>
                        <td>Urgente</td>
                    </tr >
                ))}
            </tbody>
        </table>
    )
}

export default TicketsPanel;