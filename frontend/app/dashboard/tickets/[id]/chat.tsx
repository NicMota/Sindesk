'use client'
import { useEffect, useRef, useState } from "react";
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import axios from "axios";

interface Recipient{
    id?:string,
    email?:string,
    login?:string,
    number?:string
}

interface Sender{
    id?:string,
    username?:string,
    sub?:string
    
}
interface Message{
    senderId:string,
    senderName:string,
    recipientName:string,
    recipientId:string
    content:string
}
export const Chat = ({recipient,sender,ticketId} : {recipient: Recipient, sender:Sender, ticketId:string}) =>
{   
    const [messages,setMessages] = useState<Array<Message>>([]);
    const [message,setMessage] = useState('');
    const [stompClient,setStompClient] = useState(null);

    const fetchMessages = async () => {
        try {
            const { status, data } = await axios.get(
                `http://localhost:8080/ws/messages/${ticketId}`
            )

            var d = [];
            if(data)
                 d = data;

            setMessages(d); // Atualiza o estado com as mensagens recebidas
            console.log("Mensagens carregadas:", d);
        } catch (error) {
            console.error("Erro ao carregar mensagens:", error);
            setMessages([])
        }
    };
    const display = useRef(null);
    useEffect(()=>{
        const element = display.current;
        if(element){
            element.scrollTop = element.scrollHeight;
        }
    },[messages])
    useEffect(()=>{
        
        fetchMessages();

        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);
        
        client.connect({ id:sender.id},()=>{
            // client.subscribe('/user/' + recipient.login + "/queue/messages" , message =>
            // {    
            //     console.log("Mensagem recebida de: " + sender.username + ":", message.body);
            //     const newMsg = JSON.parse(message.body);
            //     fetchMessages();
            // },{id:sender.id})
            client.subscribe('/user/' + ticketId + "/queue/messages", message=>{
                console.log("Mensagem recebida de: " + recipient.login + ":", message.body);
                const newMsg = JSON.parse(message.body);
                fetchMessages();
            })
        })


        setStompClient(client);
        return () => {
            console.log("desconectou?")
            client.disconnect();
        }
    },[])


    const sendMessage = (e) =>
    {   
     //   if(e.key!=='Enter')
    //     return;

        if(message.trim() && stompClient?.connected)
        {
            const chatMessage = {
                ticketId:ticketId,
                senderId:sender.id,
                senderName:sender.username,
                recipientName:recipient.login,
                recipientId:recipient.id,
                content:message
            };
            stompClient.send('/app/chat.sendMessage',{},JSON.stringify(chatMessage))
            setMessages(prevMessages=>[...prevMessages,chatMessage]);
           
            setMessage('');
        }else {
            console.error("STOMP client not connected or message is empty");
        }
       
    }

    function messagesList()
    {
        if(messages.length===0)
        {
            return(<p className="text-amber-600 font-bold font-serif self-end text-2xl">Envie Mensagens ao Técnico Aqui!</p>)
        }else
        {
            return messages.map((msg,index)=>
                (
                     <li key={index} className={`text-black  w-fit max-w-48 break-words ${msg.senderName==sender.username ? 'self-end  bg-amber-300' : 'self-start bg-indigo-300'} py-1 px-2 rounded-2xl my-2 right-0`}>
                         <p key={index} className={`text-indigo-500 ${msg.senderName==sender.username&&'text-end'}`}>{msg.senderName==sender.username? '' : msg.senderName} </p> <p className="text-left">{msg.content}</p>
                     </li>
                 )
            )
        }
       
    }
    
    
    return(

            <div className="flex flex-col grow w-3/6">
                <div ref={display} className='bg-amber-50 m-1 rounded grow border border-amber-700 border-2 px-2 overflow-y-auto'> {/*display*/}
                    <ul className=" h-full flex flex-col  columns-1"> 
                        {stompClient==null?(<h1 className="text-black text-center m-auto text-3xl">conectando...</h1>) : messagesList()}
                        <div className=" min-h-4 w-96 flex z-40"/>
                    </ul>
                </div>
                <div className="p-2 my-auto">
                    <div className="flex gap-x-2 ">
                        <input  type='text' className="w-full rounded-2xl outline-none text-black p-2" value={message} onChange={e => {setMessage(e.target.value)}}/>
                        <button className='text-black p-2 rounded-2xl hover:bg-black hover:text-white bg-amber-300 font-bold' onClick={sendMessage} > ENVIAR </button>
                    </div>
                </div>  
            </div>
      
    )
}