import { useState } from 'react'
import './App.css'
import StudentHomepg from './pages/studentHomepg';
import AdminHomepg from './pages/adminHome';
import Userpg from './pages/users';
import Categories from './pages/bookmarks';
import Chatroom from './pages/chatrooms';
import Register from './pages/RegistrationPage';
import Login from './pages/LoginPage';
import { Route, Routes, Navigate } from 'react-router-dom';

function App() 
{
    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />} />
                <Route path="/" element={<Login/>} />
                <Route path="/Register" element={<Register />} />

                <Route path="/Student-Dashboard" element={<StudentHomepg />} />
                <Route path="/Bookmarks" element={<Categories />} />
                <Route path="/Chatrooms" element={<Chatroom />} />

                <Route path="/Admin-Dashboard" element={<AdminHomepg />} />
                <Route path="/Users" element={<Userpg />} />
            </Routes>
        </>

        );
}

export default App;