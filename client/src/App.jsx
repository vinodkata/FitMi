import React, { useContext, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AddHealthRecord from "./components/AddHealthRecord";
import RecordModal from "./components/RecordModal";
import { KJUR } from 'jsrsasign';
import { UserContext, UserProvider } from './context/UserContext';
import UserRegistration from './components/UserRegistration';
import LoginPage from './components/LoginPage'; // Import your LoginPopup component
import logo from './assets/fitmi.png';
import UpdateUserProfile from './components/UpdateUserProfile';

const App = () => {
    const { user, setUser } = useContext(UserContext);
    const [isRegistrationOpen, setRegistrationOpen] = useState(false); // State for the registration modal
    const [isLoginOpen, setLoginOpen] = useState(false); // State for the login modal
    const [isUserUpdateOpen, setUserUpdateOpen] = useState(false);
    const [isPopupOpen, setPopupOpen] = useState(false); // Popup state

    const handleLoginSuccess = async (credentialResponse) => {
        try {
            const decoded = KJUR.jws.JWS.parse(credentialResponse.credential);
            console.log(decoded.payloadObj);
            setUser({ ...decoded.payloadObj });
        } catch (error) {
            console.error('Error decoding JWT:', error);
        }
    };

    const handleLoginFailure = () => {
        console.log('Login Failed');
    };

    const handleLogout = () => {
        setUser(null);
        console.log('User logged out');
    };

    const openRegistrationModal = () => {
        setRegistrationOpen(true);
    };

    const closeRegistrationModal = () => {
        setRegistrationOpen(false);
    };

    const openLoginModal = () => {
        setLoginOpen(true);
    };

    const closeLoginModal = () => {
        setLoginOpen(false);
    };

    const openUserUpdateModal = () => {
        if (user.picture == "")
            setUserUpdateOpen(true);
        else
            setPopupOpen(true);
    };

    const closeUserUpdateModal = () => {
        setUserUpdateOpen(false);
    };

    const PopupMessage = ({ message, onClose }) => (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <p>{message}</p>
                <button onClick={onClose} className="bg-red-600 text-white px-4 py-2 rounded mt-2">
                    Close
                </button>
            </div>
        </div>
    );
    return (
        <UserProvider>
            <GoogleOAuthProvider clientId="563022173018-r4q8qud52b6slhrb0msr3oljdma6itqb.apps.googleusercontent.com">
                <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                    <div className="container mx-auto p-4">
                        {user ? (
                            <div className="bg-white rounded-lg shadow-lg p-6">
                                <table className="w-full">
                                    <tr>
                                        <td>
                                            <div className="text-center">
                                                <img src={logo} alt="FitMi Logo" className="mx-auto h-16" />
                                                <h1 className="text-3xl font-bold text-gray-800 mt-2">Welcome, {user.name}</h1>
                                                <p className="text-gray-600 mt-1">Your health, tracked!</p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="flex flex-col items-center">
                                                {user.picture != '' ? (< img
                                                    src={user.picture}
                                                    alt="Profile"
                                                    className="rounded-full h-24 w-24 cursor-pointer"

                                                />) : (<div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600" onClick={openUserUpdateModal}>
                                                    <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                                                </div>)}
                                                <button
                                                    onClick={handleLogout}
                                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition duration-300 mt-2"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                                <Router>
                                    <Routes>
                                        <Route path="/" element={<Dashboard userId={user.sub} />} />
                                        <Route path="/add" element={<AddHealthRecord />} />
                                        <Route path="/record/:id" element={<RecordModal />} />
                                    </Routes>
                                </Router>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg">
                                <h2 className="text-3xl font-bold mb-6 text-gray-800">Please Log In</h2>
                                <img src={logo} alt="FitMi Logo" className="mx-auto h-20 mb-6" />
                                <p className="text-gray-600 text-center mb-6">Access your health metrics and stay fit!</p>

                                <GoogleLogin
                                    onSuccess={handleLoginSuccess}
                                    onError={handleLoginFailure}
                                    className="w-full"
                                />
                                <p className="mt-4">
                                    Don't have an account?
                                    <button onClick={openRegistrationModal} className="text-blue-600 hover:underline"> Register here</button>
                                    <button onClick={openLoginModal} className="text-blue-600 hover:underline ml-4">Login</button> {/* Login button */}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </GoogleOAuthProvider>
            <UserRegistration isOpen={isRegistrationOpen} onClose={closeRegistrationModal} /> {/* Include the User Registration modal */}
            <LoginPage onRegisterClick={openRegistrationModal} isOpen={isLoginOpen} onClose={() => closeLoginModal(false)} setUser={setUser} />
            {user && <UpdateUserProfile isOpen={isUserUpdateOpen} onClose={closeUserUpdateModal} userData={user} setUser={setUser} />} {/* Include UserUpdate modal */}
            {isPopupOpen && <PopupMessage message="External logins not allowed to update profile." onClose={() => setPopupOpen(false)} />}
        </UserProvider>
    );
};

export default App;
