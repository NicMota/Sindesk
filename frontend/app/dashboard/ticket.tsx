

export function Ticket({data})
{
    return (
        <div key={data.id} className="bg-indigo-700 min-w-1/3 w-2/3 ml-5 mb-2 p-2 rounded flex text-white">
            <div>
                <h1>assunto:{data.subject}</h1>
                <h1>descrição:{data.description}</h1>
                <h1>status:{data.status}</h1>
            </div>
        </div>
    )
}