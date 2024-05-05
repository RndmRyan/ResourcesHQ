import React, { useState } from 'react';
import Cards from '../segments/cards'
import UploadPage from '../segments/uploadPage';
import '../App.css'
import './studentHome.css'
import { useNavigate } from 'react-router-dom';


function studentHomepg()
{
    const navigate = useNavigate();

    const setNavPath = (path) => {
        navigate(path);
    }

    return (            
        <div>
            <Cards />
            <UploadPage />
            
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

            <button className="footer-button btn" data-bs-toggle="modal" data-bs-target="#UploadResource">
                Upload Resource
            </button>
        </div>
  );
}

export default studentHomepg;