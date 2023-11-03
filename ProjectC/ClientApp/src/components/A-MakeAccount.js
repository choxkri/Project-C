import Account from './Account';
import React, { useState, useEffect } from 'react';
import { AdminNavMenu } from './AdminNavMenu';


export function MakeAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [company, setCompany] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [allCompanies, setAllCompanies] = useState([]);
    const createAccount = () => {
        console.log(userType);
        console.log(company);
    };

    const getCompanies = async () => {
        try {
            const response = await fetch(`custcompany`);
            const data = await response.json();
            if (data) {
                setAllCompanies(data);
            }
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    useEffect(() => {
        getCompanies();
    }, []); 
    return (
        <div>
            <AdminNavMenu />
            <div className="rectanglelong">
                <h1>Create Account</h1>
                <form>
                    <div>
                        <p>Username: *</p>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className=""
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Password: *</p>
                        <input
                            type="password"
                            name="password"
                            id="passw"
                            className=""
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Type of User: </p>
                        <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                            <option value="Field Employee">Field Employee</option>
                            <option value="Service Employee">Service Employee</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div>
                        <p>Customer: </p>
                        <select value={company} onChange={(e) => setCompany(e.target.value)}>
                            {allCompanies.map((company, index) => (
                                <option key={index} value={company.custCompany_ID}>
                                    {company.custCompany_Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="button" className="" onClick={createAccount}>
                        Create Account
                    </button>

                    <button type="button" className="" onClick={getCompanies}>
                        get companies test
                    </button>
                </form>
            </div>
        </div>
    );
}
