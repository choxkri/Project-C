import React, { useState } from 'react';
import './LogInPage.css';
import logo1 from '../images/viscon-group-logo.png';
import logo2 from '../images/viscon-logo.png';
import { useNavigate } from 'react-router-dom';

export function LogInPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        // Check if the username and password match your criteria
        if (username === 'a' && password === 'a') {
            // If they match, navigate to the "AdminMenu" page
            navigate('/AdminMenu');
        } else {
            // If the credentials are incorrect, set an error message
            setErrorMessage('Invalid username or password. Please try again.');
        }
    };

    return (
        <div>
            <div className="visconlogo">
                <img src={logo2} alt="Viscon Logo" style={{ width: 387, height: 387 }} />
            </div>

            <div className="rectangle">
                <img src={logo1} alt="Viscon Group Logo" style={{ width: 410, height: 223 }} />
                <div className="welcome">
                    <p>Welcome to Viscon Platform:</p>
                </div>

                <form>
                    <div>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="textinputbutton"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            id="passw"
                            className="textinputbutton"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>



                    <button type="button" className="loginbutton" onClick={handleLogin}>
                        Login
                    </button>

                </form>
                <p >{errorMessage}</p>
            </div>
        </div>
    );
}
