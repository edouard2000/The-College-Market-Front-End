import React from "react";
import { useState } from "react";
import { useParams } from "react-router";


const Chat = (props)=>{


    const id = useParams();
    const [allMessages, setallMessages] = useState({});

    const RecieverMessage = (Message) =>{
        return(
            <p>{Message.Text}</p>
        )
    }

    const SenderMessage = (Message) =>{
        return(
            <p>{Message.Text}</p>
        )
    }


    const messages =  Object.keys(allMessages).forEach(message=>{
        if(message.Sender === 'sender'){
            return <SenderMessage message = {message} />
        }
        return <RecieverMessage message ={message}/>
    })
    


    return(
        <div>
            <div className="hading">
                <img src={props.image} alt="chat-person-image" />
                <h3>{props.name}</h3>
                <div className="messages">

                </div>
            </div>
            <div className="body">
                {messages}
            </div>
        </div>
    )
}

export default Chat;