import { useState } from 'react'
import './App.css'
import StudentHomepg from './pages/studentHomepg';
import Categories from './pages/categories';
import Chatroom from './pages/chatrooms';
import Register from './pages/RegistrationPage';
import Login from './pages/LoginPage';
import { Route, Routes, Link } from 'react-router-dom';

function App() 
{
    return (
        <>
            <Login />
        {/*     
                <header>
                <nav className="navbar">
                <h3>ResourcesHQ</h3>
                    <div className="navbar-items">
                        <Link to="">Home</Link>
                        <Link to="/Categories">Categories</Link>
                        <Link to="/Chatrooms">Chat Rooms</Link>
                    </div>
                </nav>
            </header>
            <Routes>
                <Route path="" element={<StudentHomepg />} />
                <Route path="/Categories" element={<Categories />} />
                <Route path="/Chatrooms" element={<Chatroom />} />
            </Routes>*/}
        </>

        );
}

export default App;