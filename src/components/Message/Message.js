import { Avatar } from '@material-ui/core'
import React from 'react'
import './Message.css'
const Message = ({ messages, user, timestamp }) => {
    return (
        <div className="message">
            <Avatar source={user.photo} />
            <div className="message__info">
                <h4>{user.displayName}
                    <span className="message__timestamp">{new Date(timestamp?.toDate()).toUTCString()}</span></h4>
                <p>{messages}</p>
            </div>
        </div>
    )
}

export default Message
