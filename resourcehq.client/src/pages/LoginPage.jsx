import React, { useState } from "react";
import './startingpg.css';
import { useNavigate } from 'react-router-dom';

function LoginPage()
{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const API_URL = "https://localhost:7144/";

    const handleLogin = async (e) =>
    {
        e.preventDefault();

        const response = await fetch(API_URL + `api/Resource/GetUser?email=${email}&password=${password}`)
        const data = await response.json();

        if (data.length > 0)
        {
            const userRole = data[0].userrole;
            const userId = data[0].id;

            sessionStorage.setItem('userId', userId);

            if (userRole === 'admin') {
                navigate("/Admin-Dashboard");
            } else if (userRole === 'student') {
                navigate("/Student-Dashboard");
            }
        } else {
            alert('Invalid email or password');
        }
    };

    const setpathRegister = () => {
        navigate("/Register");
    }

    return (
      <>
      <div className="bgsection">
        <div className="wrapper">
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
              
            <div data-mdb-input-init className="input-box form-outline">
                <i className="bi bi-envelope-fill ms-3"></i>
                        <input className="form-control ps-5" type="email" placeholder='Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div data-mdb-input-init className="input-box form-outline">
                <i className="bi bi-lock-fill ms-3"></i>
                        <input className="form-control ps-5" type="password" placeholder='Password' required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit">Login</button>

            <div className="opposite-link">
                        <p className="m-3"> Don't have an account? &nbsp; <button onClick={setpathRegister}> Register </button> </p>
            </div>
        </form>
        </div>
      </div>
      </>
    );
};

export default LoginPage;
