import React, { useState } from 'react';
import Cards from '../segments/specificCards'
import '../App.css'
import './studentHome.css'
import { useNavigate } from 'react-router-dom';


function adminHome()
{
    const navigate = useNavigate();

    const setNavPath = (path) => {
        navigate(path);
    }

    return (            
        <div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="my-5">
                <h3 className="m-5">Pending Resources</h3>
                <Cards resourceType="pending" />
                <h3 className="m-5">Reported Resources</h3>
                <Cards resourceType="reported" />
                <h3 className="m-5">Approved Resources</h3>
                <Cards resourceType="approved" />
            </div>

            <header>
                <nav className="navbar">
                    <h3>ResourcesHQ</h3>
                    <div className="nav nav-pills">
                        <p className="nav-link" onClick={() => setNavPath("/Admin-Dashboard")}>Home</p>
                        <p className="nav-link" onClick={() => setNavPath("/Users")}>Users</p>
                        <p className="nav-link" onClick={() => setNavPath("/")}>LogOut&nbsp;&nbsp;&nbsp;</p>
                    </div>
                </nav>
            </header>
        </div>
  );
}

export default adminHome;