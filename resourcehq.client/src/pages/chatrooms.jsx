import React, { useState, useEffect } from 'react';
import '../App.css'
import './studentHome.css'
import { useNavigate } from 'react-router-dom';

function chatRooms()
{
    const navigate = useNavigate();

    const [chatrooms, setChatrooms] = useState([]);
    const [targetchatroom, setTargetChatroom] = useState([]);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        refreshChatrooms();
    }, []);

    const refreshChatrooms = () => {
        fetch('https://localhost:7144/api/Resource/GetChatrooms')
            .then(response => response.json())
            .then(data => setChatrooms(data))
            .catch(error => console.error('Error fetching chatrooms:', error));
    };

    const changeModal = (chtrm) => {
        fetch(`https://localhost:7144/api/Resource/GetchatroomMsgs?roomID=${chtrm.ID}`)
            .then(response => response.json())
            .then(data => {
                setTargetChatroom(chtrm);
                setChats(data);
            })
            .catch(error => console.error('Error fetching chatroom messages:', error));
    };

    const sendMsgChatroom = async (e) => {
        e.preventDefault();

        var txt = document.getElementById("chatMsg").value

        const data = new FormData();
        data.append("msg", txt);
        data.append("roomID", targetchatroom.ID);
        data.append("personID", sessionStorage.getItem('userId'));

        fetch('https://localhost:7144/api/Resource/AddChatmsg', {
            method: "POST",
            body: data
        }).then(response => response.json())

        document.getElementById("chatMsg").value = "";

        fetch(`https://localhost:7144/api/Resource/GetchatroomMsgs?roomID=${targetchatroom.ID}`)
            .then(response => response.json())
            .then(data => {
                setTargetChatroom(targetchatroom);
                setChats(data);
            })
    };

    const setNavPath = (path) => {
        navigate(path);
    };

    return (
        <div>
            <header>
                <nav className="navbar">
                    <h3>ResourcesHQ</h3>
                    <div className="nav nav-pills">
                        <p className="nav-link" onClick={() => setNavPath("/Student-Dashboard")}>Home</p>
                        <p className="nav-link" onClick={() => setNavPath("/Bookmarks")}>Bookmarks</p>
                        <p className="nav-link" onClick={() => setNavPath("/Chatrooms")}>Chat Rooms</p>
                        <p className="nav-link" onClick={() => setNavPath("/")}>LogOut&nbsp;&nbsp;&nbsp;</p>
                    </div>
                </nav>
            </header>

            <div className="chatroomsetion m-5">
            <h3 className="headers">Chat Rooms</h3>

                {chatrooms.map(chatroom=>
                    <div key={chatroom.ID}>
                        <hr></hr>
                        <button className="btn" data-bs-toggle="modal" data-bs-target="#OpenChatroom" onClick={() => changeModal(chatroom)}>{chatroom.chatroomName}</button>
                    </div>
                )}
            </div>

            <div className="modal fade" id="OpenChatroom" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{targetchatroom.ID} {targetchatroom.chatroomName}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="comment-container">
                                {chats.map(msg =>
                                    <div className="">
                                        <hr></hr>
                                        <p className="">{msg.chat}</p>
                                        <small className="blockquote-footer">{msg.name}</small> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <small>{new Date(msg.msgTime).toLocaleDateString()}</small>
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="modal-footer">
                            <form onSubmit={sendMsgChatroom}>
                                <input id="chatMsg" className="form-control" type="text" placeholder='Enter Message' required />
                                <button type="submit" className="btn btn-success">Send</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default chatRooms;