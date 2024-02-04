import React from 'react';
import ReactDOM from 'react-dom';
import MyMessage from "./MyMessage.jsx";
import OtherMessage from "./OtherMessage.jsx";

function ChatRoom(){

    return (
        <div className="chat card direct-chat direct-chat-primary">
            <div className="card-header">
                <h3 className="card-title" style={{marginTop: "8px", marginBottom: "4px"}}>Chat Room</h3>
            </div>
            <div className="card-body">
                <div className="direct-chat-messages">
                    <MyMessage
                        name="Sarah Bullock"
                        timestamp="23 Jan 2:05 pm"
                        text=" Working with AdminLTE on a great new app! Wanna join?
                    Working with AdminLTE on a great new app! Wanna join?
                    Working with AdminLTE on a great new app! Wanna join?"
                    />
                    <OtherMessage
                        name="Sarah Bullock"
                        timestamp="23 Jan 2:05 pm"
                        text=" Working with AdminLTE on a great new app! Wanna join?
                    Working with AdminLTE on a great new app! Wanna join?
                    Working with AdminLTE on a great new app! Wanna join?"
                    />
                </div>
            </div>
            <div className="card-footer">
                <form action="#" method="post">
                    <div className="input-group">
                        <input type="text" name="message" placeholder="Type Message ..." className="form-control"/>
                        <span className="input-group-append">
                            <button type="button" className="btn btn-primary">Send</button>
                        </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChatRoom;

if (document.getElementById('chat-room')) {
    ReactDOM.render(<ChatRoom/>, document.getElementById('chat-room'));
}
