import Account from './Account';
import React, { useState, useEffect } from 'react';
import { AdminNavMenu } from './AdminNavMenu';


export function MakeAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [userType, setUserType] = useState(1);
    const [company, setCompany] = useState(0);
    const [department, setDepartment] = useState(0);

    const [errorMessage, setErrorMessage] = useState('');

    const [allCompanies, setAllCompanies] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allTypes, setAllTypes] = useState([]);
    const creatteAccount = () => {
 
        console.log(username);
        console.log(password);
        console.log(number);
        console.log(email);
        console.log(company);
        console.log(department);
        console.log(userType);
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

    const getDepartment = async () => {
        try {
            const response = await fetch(`department`);
            const data = await response.json();
            if (data) {
                setAllDepartments(data);
            }
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    const getTypes = async () => {
        try {
            const response = await fetch(`typeaccount`);
            const data = await response.json();
            if (data) {
                setAllTypes(data);
            }
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    const createAccount = async () => { 
        try {
            // Constructing the endpoint with correct parameters
            const response = await fetch(`account/${username}/${password}/${number}/${email}/${company}/${department}/${userType}`);
            const data = await response.text();
            setErrorMessage(data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    }

    useEffect(() => {
        getCompanies();
        getDepartment();
        getTypes();
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
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Password: *</p>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <p> E Mail: *</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>Phone number : *</p>
                        <input
                            type="text"
                            name="number"
                            placeholder="Enter your phone number"
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <p>User Type: </p>
                        <select onChange={(e) => setUserType(e.target.value)}>
                            {allTypes.map((type, index) => (
                                <option key={index} value={type.type_ID}>
                                    {type.type_Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>Department: </p>
                        <select onChange={(e) => setDepartment(e.target.value)}>
                            {allDepartments.map((department, index) => (
                                <option key={index} value={department.department_ID}>
                                    {department.department_Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <p>Customer: </p>
                        <select  onChange={(e) => setCompany(e.target.value)}>
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

                    {/*<button type="button" className="" onClick={creatteAccount}>*/}
                    {/*    get companies test*/}
                    {/*</button>*/}
                </form>
                <p> { errorMessage}</p>
            </div>
        </div>
    );
}
