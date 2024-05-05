import React, { useState } from 'react';
import Tables from '../segments/usertable'
import '../App.css'
import './studentHome.css'
import { useNavigate } from 'react-router-dom';

function adminHome() {
    const [selectedRadio, setSelectedRadio] = useState('student');
    const navigate = useNavigate();

    const setNavPath = (path) => {
        navigate(path);
    }

    const handleRadioChange = (event) => {
        setSelectedRadio(event.target.value);
    }

    return (
        <>
            <div classNmae="chatroomsetion m-5">
            <div className="my-5">
                <br />
                <br />
                <br />
                <br />
                <div className="input-group">
                    <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="student" onChange={handleRadioChange}
                            checked={selectedRadio === 'student'} />
                        <label className="form-check-label" htmlFor="inlineRadio1">Students</label>
                    </div>
                    <div className="form-check form-check-inline ">
                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="admin" onChange={handleRadioChange} />
                        <label className="form-check-label" htmlFor="inlineRadio2">Admin</label>
                    </div>
                </div>

                    {(
                        <><h3 className="m-5">Pending</h3>
                            <Tables key={`pending-${selectedRadio}`} userstatus="pending" role={selectedRadio} />
                        </>
                    )}
                    { (
                        <><h3 className="m-5">Registered</h3>
                            <Tables key={`pending-${selectedRadio}`} userstatus="registered" role={selectedRadio} />
                        </>
                    )}
            </div>
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
        </>
    );
}

export default adminHome;
