import React, { useState } from "react";
import './startingpg.css';
import { useNavigate } from 'react-router-dom';

function RegistrationPage()
{
    const navigate = useNavigate();
    const API_URL = "https://localhost:7144/";
    const [roles, setRole] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault(); 

        var name = document.getElementById("userName").value
        var email = document.getElementById("userEmail").value
        var password = document.getElementById("Password").value
        var password2 = document.getElementById("Password2").value
        var role = roles

        if (password === password2) {
            const data = new FormData();
            data.append("name", name);
            data.append("email", email);
            data.append("password", password);
            data.append("role", role);

            const response = await fetch(API_URL + 'api/Resource/AddUser', {
                method: "POST",
                body: data
            })


            alert('User Added, Please Wait for Admin to Approve Request');
        }
        else {
            alert('Passwords Do Not Match.');
        }
    };

    const setpathLogin = () => {
        navigate("/");
    }

  return (
      <>
    <div className="wrapper">
    <form onSubmit={handleRegister}>
        <h1>Register</h1>
        <div data-mdb-input-init className="input-box form-outline">
            <i className="bi bi-person-fill ms-3"></i>
            <input id="userName" className="form-control ps-5" type="text" placeholder='Name' required />
        </div>
        <div data-mdb-input-init className="input-box form-outline">
            <i className="bi bi-envelope-fill ms-3"></i>
            <input id="userEmail" className="form-control ps-5" type="email" placeholder='Email' required />
        </div>
        <div data-mdb-input-init className="input-box form-outline">
            <i className="bi bi-lock-fill ms-3"></i>
            <input id="Password" className="form-control ps-5" type="password" placeholder='Password' required />
        </div>
        <div data-mdb-input-init className="input-box form-outline">
            <i className="bi bi-lock-fill ms-3"></i>
            <input id="Password2" className="form-control ps-5" type="password" placeholder='Re-enter Password' required />
        </div>
        <div>
            <select id="roles" defaultValue="" placeholder='Select Role' onChange={(e) => setRole(e.target.value)} required>
                <option value="" disabled selected>Select Role</option>
                <option value="student">Student</option>
                <option value="admin">Admin</option>
            </select>
        </div>
        <button type="submit">Register</button>
        <div className="opposite-link">
            <p className="m-3"> Already have an account? &nbsp; <button onClick={setpathLogin}> Login </button> </p>
        </div>
    </form>
          </div>
    </>
  )
};

export default RegistrationPage;
