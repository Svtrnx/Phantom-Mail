import { useState, useEffect, } from 'react'
import {Routes, Route, useNavigate } from 'react-router-dom';
import { ToastManager } from './components/ToastContext';
import Signin from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import { getMe } from './services/user/User';

import './App.css';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
            const response = await getMe();
            console.log('response:', response); 
            if (response && response.email && response.password) {
                setIsAuthenticated(true);
                navigate('/home');
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
        <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            {isAuthenticated && <Route path="/home" element={<Home />} />}
        </Routes>
        <ToastManager />
        </>
    )
}

export default App
