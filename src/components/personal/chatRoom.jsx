import React, { useState, useEffect } from 'react';
import AccountNavigation from './accountNavigation';
import './chatRoom.css'
import SearchIcon from '../../images/search.png'
import archive from '../../images/archives.png'
import filter from '../../images/filter.png'
import drive from '../../images/drive.png'
import folder from  '../../images/folder.png'
import welcome from '../../images/comment.png'
import sendIcon from '../../images/send-message.png'
import {ROOT_URL } from '../../actions/useractions';
import { useDispatch, useSelector } from 'react-redux';
// import { getChatMessages } from '../../actions/useractions';
import {io} from 'socket.io-client'
// import { set } from 'lodash';

const ChatRoom = () => {

  const [messages, setMessages] = useState([]); // these are the messages of the current conversations, 
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState();
  const [selected, setSelected ] = useState();
  const [inputClass, setinputClass] = useState('input-area') 
  const [allClass, setAllClass] = useState('SelectionDisplay');
  const [unreadClass, setUnreadClass] = useState('unSelectDisplay');
  const [selectedDisplay, setSelectedDisplay] = useState('All');
  const [currentRoom, setCurrentRoom] = useState();
  const [activePerson, setActivePerson] = useState('No Active User')

  let unreadMessages = 0;



  const socket = io(ROOT_URL)
  socket.on('connect', async()=>{
    const userId = localStorage.getItem('userToken') 
    socket.emit('get_conversations', userId, (conversations)=>{
      setConversations(conversations);
    })
  })

  const handleSelection = (conversationId)=>{
    setSelected(conversationId);
    setCurrentRoom(conversationId);
    socket.emit('get_messages', conversationId, (messages)=>{ 
      setMessages(messages);
    })
  }

  const ConversationHandler = (props)=>{
    return(
        <div className="person" onClick={()=>{handleSelection(props.conversationId)}}> 
            <h3>{props.conversationName}</h3>
        </div>
    )
  }

  socket.on('recieve_message', (message)=>{ 
    setMessages([...messages, message]);
  })

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const Message = (props)=>{
    return(
        <div className={props.className}>
            <p className='message-content'>{props.messageContent}</p>
        </div>
    )
  }

const Handler = (props)=>{
    if(props.name === 'persons'){
        return(
            <div>
            {(!conversations)? <div className='peopleContainer'>
                <img src={props.image} alt="another-image"  className='personsImage'/>
                <p className='conversationsText'>No messages yet</p>
            </div> : conversations.map(conversation=>{
                socket.emit('join_room', conversation) 
                return <ConversationHandler conversationName = {conversations[conversation].conversationName} conversationId ={conversation}/>
            })
            }
        </div> 
        )
    }else{
        if(selected){ 
            return(
                <div className='nothingHolderselected'>
                    {setinputClass('displayNoneInputClass')}
                    <img src={props.image} alt="none-selected-image" className='folderImage'/>
                    <p className='welcomingMessage'>Welcome to the messaging center</p>
                </div>
            )
        } else{
            setinputClass('input-area')
            return(
                <div>
                   {messages.map((message) => {
                    console.log(message);
                    return  <Message  className = {(message.Sender === 'Me')? 'fromMe' : 'fromAnotherPerson'} messageContent = {message.text}/>
                   })
            }
                </div>
            )
        }
}
    
}

  const interChangeonAll = ()=>{
    const temp = allClass;
    setAllClass('SelectionDisplay')
    setSelectedDisplay('All')
    setUnreadClass('')
  }

  const interChangeOnUnread = ()=>{
    setUnreadClass('SelectionDisplay')
    setSelectedDisplay('Unread')
    setAllClass('');
  }


  const handleSendMessage = () => {
    if (input.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        Sender : 'Me',
        text: input.trim(),
        timestamp: new Date().toDateString()
      };
      setInput('');
      socket.emit('new_message', newMessage, currentRoom);
      setInput('');
    }
  };

  useEffect(() => {
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-room">
    <AccountNavigation navContent = {{"My transactions"  : 'transactions'}}/>
        <div className="chatting_session">
            <div className="messaging-people">
                <div className="message_heading" >
                    <div className="searching">
                         <input type="text" placeholder={'Search chat'}/> 
                         <img src={drive} alt="drive-icon" className='drive-icon'/>
                    </div>
                    <hr />

                    <div className="classifiers">
                        <div className="sectionOne" style={{
                        }}>
                            <h4 className={allClass} onClick ={interChangeonAll}>All</h4>
                            <h4 className={unreadClass} onClick ={interChangeOnUnread}>Unread</h4>
                        </div>
                        
                        <div className="sectionTwo">
                            <img src={filter} alt="filter-image" />
                            <img src={archive} alt="archived-messages" />
                        </div>
                    </div>
                    <hr />
                </div>
                <div className="persons">
                    {<Handler name = 'persons' image = {folder}/>}
                </div>
            </div>


            <div className="chat-sessions">
                <div id='activeChatPerson' className='activeChatPerson'>{activePerson}</div>
                
                <div id="chat-window" className="chat-window">
                    {<Handler name = 'selected' image = {welcome}/>}
                </div>

                <div className={inputClass}>
                    <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                    className='input_text_area'
                    />
                    <img src={sendIcon} alt="send-icon" className='sendImage' onClick={handleSendMessage}/>
                </div>
        </div>
        </div>
    </div>
  );
};

export default ChatRoom;