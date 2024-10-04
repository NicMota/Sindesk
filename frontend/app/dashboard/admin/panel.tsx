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
        <div className="flex flex-col h-screen max-h-screen bg-indigo-100 ">
            <div className="h-1/3 text-[5rem] border-b-2 border-black ">
                Seus tickets
            </div>
            <div className="w-fit bg-yellow-50 max-w-[40rem] overflow-auto max-h-full h-2/3">
                <table className='table-fixed text-left rounded bg-indigo-600 '>
                    <thead className="bg-indigo-600">
                        <tr className="*:px-2 *:py-1"><th>Status</th><th>Assunto</th><th>Solicitante</th><th>Data</th><th>prioridade</th></tr>
                    </thead>
                    <tbody className="bg-indigo-200">
                        {data.map((e, i) => (
                            <tr key={i} className="odd:bg-indigo-300  *:px-2 *:py-1 *:max-w-fit overflow-auto max-h-8 space-x-4 text-black font-bold border-white border hover:bg-indigo-600 cursor-pointer">
                                <td><p className="break-words  max-w-32 w-20 overflow-auto">{e.status}</p></td>
                                <td><p className="break-words  max-w-60 w-52 overflow-auto">{e.subject}</p></td>
                                <td><p className="break-words  max-w-60 w-52 overflow-auto">{e.sender.email}</p></td>
                                <td><p className="break-words  max-w-52 w-48 overflow-auto">{formatDate(e.createdAt)}</p></td>
                                <td>Urgente</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
           
        </div>
        )
}