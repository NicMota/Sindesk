export const TicketsPanel = ({data}) =>
{
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
    return(
        <div className="flex flex-col w-fit max-w-fit max-h-full resize-x overflow-y-auto bg-indigo-100 ">
            <div className="h-1/4 border-black text-5xl font-thin text-center py-auto ">
                Seus tickets
            </div>
            <div className="bg-indigo-100 overflow-y-auto">
                <table className='border-collapse text-left   '>
                    <thead className=" bg-indigo-100 sticky top-0">
                        <tr className=""><th>Status</th><th>Assunto</th><th>Solicitante</th><th>Data</th><th>prioridade</th></tr>
                    </thead>
                    <tbody className="bg-indigo-200 max-h-min">
                        {data.map((e, i) => (
                            <tr key={i} className="odd:bg-indigo-300 space-x-4 text-black *:py-1 border-white border hover:bg-indigo-600 cursor-pointer">
                                <td><p className="break-words  max-w-32  w-20 overflow-auto">{e.status}</p></td>
                                <td><p className="break-words  max-w-96  w-80 overflow-auto">{e.subject}</p></td>
                                <td><p className="break-words  max-w-96  w-80 overflow-auto">{e.sender.email}</p></td>
                                <td><p className="break-words  max-w-52  w-48 overflow-auto">{formatDate(e.createdAt)}</p></td>
                                <td>Urgente</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           
        </div>
        )
}