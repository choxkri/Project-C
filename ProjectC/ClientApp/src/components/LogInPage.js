
import React, { useState } from 'react';
import './LogInPage.css';
import logo1 from '../images/viscon-group-logo.png';
import logo2 from '../images/viscon-logo.png';
import { useNavigate } from 'react-router-dom';
import Account from './Account';

export function LogInPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [account, setAccount] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
  
   

    
    const handleLogin = async () => {
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
                Account.account = data;
                console.log(Account.account);
            }
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    const handleLogin2 = async (accountData) => {
        try {
            if (!accountData) {
                console.error('No account data available');
                return;
            }

            const response = await fetch(`account/${accountData.account_ID}`);
            console.log(response);
            const data = await response.text();
            console.log(data);

            if (data === "Employee") {
                console.log("emp");
                navigate('/FieldEmployeeMenu');
            } else if (data === "Admin") {
                console.log("adm");
                navigate('/AdminMenu');
            } else if (data === "Customer") {
                console.log("cust");
                navigate('/FieldEmployeeMenu');
            } else {
                
                console.log("Unknown path");
            }
        } catch (error) {
            console.error('Error getting type of user:', error);
        }
    };


    //This thing should handle the login. It should get the employee from the database that correspons with the inputted username and password.
    //then it will be sent to the correct path (based on user type)
    //const handleLogin = () => { 

        //console.log("gfd");
        //setErrorMessage('nonrggto');
        //const response = fetch(`accountviscon/${username}/${password}`);
        //const data =  response.json();
        //setAccount(data);
        //const response2 = fetch(`accountviscon/${account}`);
        //if (account == null) {
        //    setErrorMessage('nono');
        //}
        //console.log("gfd");
        //console.log(account);
        
        

        //// Check if the username and password match your criteria
        //if (username === 'a' && password === 'a') {

        //    navigate('/AdminMenu');
        //}
        //else if (username === 'f' && password === 'f') {
        //    navigate('/FieldEmployeeMenu');
        //}
        //else if (username === 's' && password === 's') {
        //    navigate('/ServiceEmployeeMenu');
        //} else {
        //    // If it is incorrect, set an error message
        //    setErrorMessage('Invalid username or password. Please try again.');
        //}


   // };

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
