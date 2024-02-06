import React from 'react';

export default function Message(props){
    return props.props.map((prop, i)=> {
        return (
        <div className={(prop.status) ? 'direct-chat-msg right' : 'direct-chat-msg'} style={{paddingTop: "10px"}} key={i}>
            <div className="direct-chat-infos clearfix">
                <span className={(prop.status) ? 'direct-chat-name float-right' : 'direct-chat-name float-left'}>{prop.user}</span>
                <span className={(prop.status) ? 'direct-chat-timestamp float-left' : 'direct-chat-timestamp float-right'}>{prop.created_at}</span>
            </div>
            <img className="direct-chat-img"
                 src="https://images.pexels.com/lib/avatars/grey.png?w=130&h=130&fit=crop&dpr=1"
                 alt="image"/>
            <div className="direct-chat-text">
                {prop.message}
            </div>
        </div>
        )
    })
}
