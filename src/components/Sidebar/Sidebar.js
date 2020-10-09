import React from 'react'
import './Sidebar.css';
import { ExpandMore, Add, SignalCellularAlt, InfoOutlined, Call, Mic, Settings, Headset } from '@material-ui/icons'
import { Avatar } from '@material-ui/core'
import SidebarChannel from '../SidebarChannel/SidebarChannel';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import db, { auth } from '../../API';
const Sidebar = () => {

    const user = useSelector(selectUser);
    const [channels, setChannels] = React.useState([]);

    React.useEffect(() => {
        db.collection('channels').onSnapshot(snapshot => {
            setChannels(snapshot.docs.map(d => ({
                id: d.id,
                channel: d.data()
            })))
        })
    }, [])

    const handleAddChannels = () => {
        const channelName = prompt('Enter a new channel name');

        if (channelName) {
            db.collection('channels').add({
                channelName: channelName
            })
        }
    }

    return (
        <div className="sidebar">
            <div className="sidebar__top">
                <h3>Clever Programmer</h3>
                <ExpandMore />
            </div>
            <div className="sidebar__channels">
                <div className="sidebar__channelsHeader">
                    <div className="sidebar__header">
                        <ExpandMore />
                        <h4>Text Channels</h4>
                    </div>
                    <Add onClick={handleAddChannels} className="sidebar_addChannel" />
                </div>
                <div className="sidebar_channelsList">
                    {channels.map(({ id, channel }) => (
                        <SidebarChannel key={id} id={id} channelName={channel.channelName} />
                    ))}
                </div>
            </div>
            <div className="sidebar__voice">
                <SignalCellularAlt className="sidebar__voiceIcon" fontSize="large" />
                <div className="sidebar__voiceInfo">
                    <h3>Voice Connected</h3>
                    <p>Stream</p>
                </div>
                <div className="sidebar__voiceIcons">
                    <InfoOutlined />
                    <Call />
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar onClick={() => auth.signOut()} src={user.photo} />
                <div className="sidebar__profileInfo">
                    <h3>{user.displayName}</h3>
                    <p>#{user.uid.substring(0, 5)}</p>
                </div>
                <div className="sidebar__profileIcons">
                    <Mic />
                    <Headset />
                    <Settings />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
