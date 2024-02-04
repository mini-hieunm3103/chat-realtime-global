import React from 'react';

export default function MyMessage(props){
    return (
        <div className="direct-chat-msg right" style={{paddingTop: "10px"}}>
            <div className="direct-chat-infos clearfix">
                <span className="direct-chat-name float-right">{props.name}</span>
                <span className="direct-chat-timestamp float-left">{props.timestamp}</span>
            </div>
            <img className="direct-chat-img" src="https://images.pexels.com/lib/avatars/grey.png?w=130&h=130&fit=crop&dpr=1" alt="image"/>
            <div className="direct-chat-text">
                {props.text}
            </div>
        </div>
    )
}
