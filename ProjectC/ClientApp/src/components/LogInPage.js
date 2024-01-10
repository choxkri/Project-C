import React, { useState , useEffect} from 'react';

import logo1 from '../images/viscon-group-logo.png';
import logo2 from '../images/viscon-logo.png';
import { useNavigate } from 'react-router-dom';

export function LogInPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [account, setAccount] = useState(null);
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};

        console.log(user?.typeAccountID); // Use optional chaining to handle potential null or undefined
        //window.location.reload();
        if (user) {
            if (user.typeAccountID === 3) {
                console.log('adm');
                navigate('/AdminMenu');
            } else if (user.typeAccountID === 1) {
                console.log('emp');
                navigate('/ServiceEmployeeMenu');
            } else if (user.typeAccountID === 2) {
                console.log('ter');
                navigate('/FieldEmployeeMenu');
            } else {
                // Handle other cases or show an error message
                console.log("uo");
            }
        } else {
            // Handle the case when there is no user data
            console.log("uyyyyo");
        }

    }, []);

    const handleLogin = async () => {
        if (username == "") {
            setErrorMessage("Username field must not be empty.");
        }
        else if (password == "") {
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
                    setAccount(data);
                    console.log(data);
                    console.log(account);



                    // Call handleLogin2 after setting the account
                    handleLogin2(data);
                }
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        }
    };

    const handleLogin2 = async (accountData) => {
        try {
            if (!accountData) {
                console.error('No account data available');
                return;
            }

            const response = await fetch(`account/${accountData.accountID}`);
            const userType = await response.text();

            localStorage.setItem('user', JSON.stringify(accountData));

            // Define a map of user types to corresponding paths
            const userTypeToPath = {
                'Employee': '/ServiceEmployeeMenu',
                'Admin': '/AdminMenu',
                'Customer': '/FieldEmployeeMenu'
                // Add more user types as needed
            };
            window.location.reload();

            // Check if the userType is defined in the map
            if (userTypeToPath[userType]) {
                navigate(userTypeToPath[userType]);
            } else {
                console.log("Unknown user type");
                // You can redirect to a default page or handle this case as needed
            }
        } catch (error) {
            console.error('Error getting type of user:', error);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        handleLogin(); // Call your handleLogin function
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