

import React, { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';

function Chat(props) {
    const [rec, setRec] = useState('');
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [group,setgroup]=useState('')
    const socket = useMemo(() => io("http://localhost:4000"), []);
    
    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to server', socket.id);
        });

        socket.on("welcome", (msg) => console.log(msg));
        socket.on("greeting", (msg) => console.log(msg));

        socket.on("rec-msg",(msg)=> setMessages((prev)=>[...prev,msg]) );
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("message", {
            receiver: rec,
            message: msg
        });
    };

    const handlGroupeSubmit=(e)=>{
        e.preventDefault();

        socket.emit("groip-join",group)
    }

    const handleRecChange = (e) => {
        setRec(e.target.value);
    };

    const handleMsgChange = (e) => {
        setMsg(e.target.value);
    };

    const handleGroupjpin = (e) => {
        setgroup(e.target.value);
    };

    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Chat</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Chat</li>
                </ol>
            </div>
            <form  onSubmit={handlGroupeSubmit}>
            <input
                    type="text"
                    name="receiver"
                    placeholder="Type a receiver id"
                    onChange={handleGroupjpin}
                />
                <input type="submit" />
            </form>
            <br></br>
            <br></br>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="receiver"
                    placeholder="Type a receiver id"
                    onChange={handleRecChange}
                />
                <input
                    type="text"
                    name="message"
                    placeholder="Type a message"
                    onChange={handleMsgChange}
                />
                <input type="submit" />
            </form>

            {
                messages.map((v)=>(
                    <p>{v}</p>
                ))
            }
        </div>
    );
}

export default Chat;
