import React, { useState , useEffect} from 'react';

import logo1 from '../images/viscon-group-logo.png';
import logo2 from '../images/viscon-logo.png';
import { useNavigate } from 'react-router-dom';

export function LogInPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};

      
        if (user) {
            if (user.typeAccountID === 3) {
                
                navigate('/A-MakeAccount');
            } else if (user.typeAccountID === 1) {
              
                navigate('/ServiceEmployeeMenu');
            } else if (user.typeAccountID === 2) {
                
                navigate('/FieldEmployeeMenu');
            } else {
               
               
            }
        } else {
          
        
        }

    }, []);

    const handleLogin = async () => {
        if (username === "") {
            setErrorMessage("Username field must not be empty.");
        }
        else if (password === "") {
            setErrorMessage("Password field must not be empty.")

        }
        else {
            try {
                setErrorMessage("Loading...");
                const response = await fetch(`account/${username}/${password}`);
                const toText = await response.text();
                if (toText === "") {
                    setErrorMessage("Invalid Credentials");
                } else {
                    const data = JSON.parse(toText);
                    localStorage.setItem('user', JSON.stringify(data));
                 
                    
                    window.location.reload();

                }
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        }
    };

    


    const handleSubmit = (e) => {
        e.preventDefault(); 
        handleLogin();
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

                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className="loginbutton">
                        Login
                    </button>
                </form>
                <p className={errorMessage === 'Loading...' ? 'loading-message' : 'error-message'}>
                    {errorMessage}
                </p>
            </div>
        </div>
    );
}