export const UsersPanel = ({users}) =>
    {
        
    
        return(
            <>
                <div className="h-1/4 flex border-black my-4  text-5xl font-thin text-center py-auto text-black">
                    <p className="m-auto">Usuarios</p>
                </div>
                <div className="flex flex-col grow border-2 bg-amber-950 border-black overflow-auto">
                    <UsersTable users={users}/>
                </div>
              
            </>
        )
    }
    function UsersTable({users})
    {
        return(
            <table className='border-collapse text-left overflow-auto'>
                <thead className=" bg-amber-800 *:text-amber-200 border-b-2 border-black sticky top-0 text-black">
                    <tr className=""><th>Nome</th><th>Email</th><th>Telefone</th><th>Tickets</th></tr>
                </thead>
                <tbody className="bg-amber-200">
                    {users.map((e, i) => (
                            <tr key={i}  className="transition-all duration-200 odd:bg-amber-500 space-x-4 text-black font-bold font-serif *:py-1 border-black bordery-2 hover:bg-amber-800 hover:text-amber-200 cursor-pointer">
                            
                                <td><p className="break-words  max-w-32  w-32 overflow-auto">{e.login}</p></td>
                                <td><p className="break-words  max-w-96  w-80 overflow-auto">{e.email}</p></td>
                                <td><p className="break-words  max-w-96  w-60 overflow-auto">{e.number}</p></td>
                                <td>Urgente</td>
                                
                            </tr>
                    ))}
                </tbody>
            </table>
        )
    }
    