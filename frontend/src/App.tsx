import { useState, useEffect, } from 'react'
import {Routes, Route, Navigate } from 'react-router-dom';
import { ToastManager } from './components/ToastContext';
import Signin from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import { getMe } from './services/user/User';
import {Spinner} from "@nextui-org/react";
import Privacy from './pages/privacy/Privacy';
import {NextUIProvider} from "@nextui-org/react";
import { useLottieFile } from './components/LottieUrl';
import './App.css';


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({email: '', password: ''});
    
    const lottieFile = useLottieFile("https://lottie.host/963cf71d-1fb3-49a1-87a8-5494a545b152/bSRPCIlzmB.lottie");
    

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await getMe();
                if (response && response.email && response.password) {
                    setUserData(response);
                    setIsAuthenticated(true);
                }
                setLoading(false);
            }
            catch (error: any) {
                console.log(error.response.data);
            }
        };

        fetchUserData();
    }, []);

    
    return (
        <>
        <NextUIProvider style={{height: "100%"}} className='bg-background'>
            {loading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <Spinner color="secondary" label="Loading..." labelColor="secondary" />
                </div>
            ) : isAuthenticated ? (
                <Routes>
                    <Route path="/home" element={<Home email={userData.email} password={userData.password} lottieFile={lottieFile} />} />
                    <Route path="/privacy" element={<Privacy email={userData.email} password={userData.password} />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            ) : (
                <Routes>
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<Navigate to="/signin" replace />} />
                </Routes>
            )}
            <ToastManager />
        </NextUIProvider>
        </>
    );
    
}

export default App
