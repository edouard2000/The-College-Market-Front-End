import axios from "axios";
import { chatActions } from "../reducers/chatReducer";
const ROOT_URL = 'http://localhost:9090/'
import { io } from "socket.io-client";
import { useState } from "react";

const [messages, setMessages] = useState({});





export async function sendMessage(){
    socket.emit('message', messageComponents);
}


const socket = io(ROOT_URL);
socket.on('connect', ()=>{
    console.log('connected to the server');
})



export const chatActions = {
    GET_USER_MESSAGES : 'GET_USER_MESSAGES'
}


export function getMessages(id){
    socket.emit('getMessages', id, (messages)=>{
        setMessages(messages)
    });   
}