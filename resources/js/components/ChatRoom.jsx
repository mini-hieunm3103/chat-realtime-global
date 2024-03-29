import React, {useState, useEffect, useRef} from 'react';
import ReactDOM from "react-dom";
import Message from "./Message.jsx";

function ChatRoom(){
    const [message, setMessage] = useState('');
    const [listMessages, setListMessages] = useState([]);
    const lastMessage = useRef(null);
    const [currentUserId, setCurrentUserId] = useState('')
    const loadMessages = () => {
        fetch('/message')
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                if (data.status === 204){
                    setListMessages([])
                } else {
                    setListMessages(data.data)
                }
            })
            .catch(err=> {
                console.log(err)})
    }
    const sendMessage = () => {
        const token = document.head.querySelector('meta[name="csrf-token"]').content;
        fetch('/message', {
            method: "POST",
            body: JSON.stringify({
                message
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                'X-CSRF-TOKEN': token
            }
        })
            .then((res)=> {
                return res.json()
            })
            .then((messageData) => {
                // setListMessages([...listMessages, messageData.data]);
                setMessage('')
            })
            .catch((err)=> {
                console.log(err)
            })

    }
    const getCurrentUserId = () => {
        fetch("/current-login")
            .then((res) => res.json())
            .then((user) => {
                setCurrentUserId('')
                setCurrentUserId(user.id)
            })
    }
    const scrollToLastMessage = () => {
        if (lastMessage.current){
            lastMessage.current.scrollIntoView({behavior: "smooth"})
        }
    }
    useEffect(()=> {
        loadMessages();
        getCurrentUserId();
        Echo.channel('laravel_database_chatroom')
            .listen('MessagePosted', (data)=> {
                const newMessage = data.message
                setListMessages(prevMessages => [...prevMessages, newMessage])
            })
            .error((err)=> {
                console.log(err)})
    }, [])
    useEffect(()=> {
        scrollToLastMessage()
    }, [listMessages])

    return (
        <div className="chat card direct-chat direct-chat-primary">
            <div className="card-header">
                <h3 className="card-title" style={{marginTop: "8px", marginBottom: "4px"}}>Global Chat</h3>
            </div>
            <div className="card-body">
                <div className="direct-chat-messages">
                    <Message
                        props={listMessages}
                        user ={currentUserId}
                    />
                    <div ref={lastMessage}/>
                </div>
            </div>
            <div className="card-footer">
                <div className="input-group">
                    <input type="text" name="message"
                           value={message}
                           onChange={(e) => setMessage(e.target.value)}
                           placeholder="Type Message ..." className="form-control"/>
                    <span className="input-group-append">
                        <button type="button" onClick={sendMessage} className="btn btn-primary">Send</button>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom;

if (document.getElementById('chat-room')) {
    ReactDOM.render(<ChatRoom/>, document.getElementById('chat-room'));
}
