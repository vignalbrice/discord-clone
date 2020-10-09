import { AddCircle, CardGiftcard, EmojiEmotions, Gif } from '@material-ui/icons'
import React from 'react'
import { useSelector } from 'react-redux'
import db from '../../API'
import { selectChannelId, selectChannelName } from '../../features/app/appSlice'
import { selectUser } from '../../features/user/userSlice'
import ChatHeader from '../ChatHeader/ChatHeader'
import Message from '../Message/Message'
import firebase from 'firebase';
import './Chat.css'
const Chat = () => {

    const user = useSelector(selectUser);
    const channelId = useSelector(selectChannelId);
    const channelName = useSelector(selectChannelName);
    const [input, setInput] = React.useState('');
    const [messages, setMessages] = React.useState([]);

    React.useEffect(() => {
        if (channelId) {
            db.collection('channels').doc(channelId).collection("messages").orderBy('timestamp', 'desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(d => d.data()))
            });
        }
    }, [channelId])
    const sendMessages = (e) => {
        e.preventDefault();
        db.collection('channels').doc(channelId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user,

        });
        setInput('');
    }
    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />
            <div className="chat__messages">
                {messages.map(m => (
                    <Message messages={m.message} user={m.user} timestamp={m.timestamp} />
                ))}
            </div>
            <div className="chat__input">
                <AddCircle fontSize="large" />
                <form>
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={!channelId} placeholder={`Messages #${channelName}`} />
                    <button className="chat__inputButton" type="submit" onClick={sendMessages}>Send Message</button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcard fontSize="large" />
                    <Gif fontSize="large" />
                    <EmojiEmotions fontSize="large" />

                </div>
            </div>
        </div>
    )
}

export default Chat
