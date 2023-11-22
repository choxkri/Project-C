
import React, { useState, useEffect } from 'react';
import { AdminNavMenu } from './AdminNavMenu';

export function MakeAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [userType, setUserType] = useState(1);
    const [company, setCompany] = useState(1);
    const [department, setDepartment] = useState(1);

    const [errorMessage, setErrorMessage] = useState('');

    const [allCompanies, setAllCompanies] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allTypes, setAllTypes] = useState([]);

    const creatteAccount = () => {
        console.log(username, password, number, email, company, department, userType);
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

    const checkFields = () => {
        if (username === '') {
            setErrorMessage('Username field is not allowed to be empty.');
        } else if (password === '') {
            setErrorMessage('Password field is not allowed to be empty.');
        } else if (email === '') {
            setErrorMessage('E-Mail field is not allowed to be empty.');
        } else if (number === '') {
            setErrorMessage('Phone Number field is not allowed to be empty.');
        } else {
            createAccount();
        }
    };

    const createAccount = async () => {
        try {
            const response = await fetch(`account/${username}/${password}/${number}/${email}/${company}/${department}/${userType}`);
            const data = await response.text();
            setErrorMessage(data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

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
                    <div className="col-md-4 mx-auto">
                        <label className="form-label"><br></br>Username: *</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4 mx-auto">
                        <label className="form-label"><br></br>Password: *</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4 mx-auto">
                        <label className="form-label"><br></br>E-Mail: *</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter your email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4 mx-auto">
                        <label className="form-label"><br></br>Phone Number: *</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your phone number"
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4 mx-auto">
                        <label className="form-label"><br></br>User Type:</label>
                        <select className="form-select" onChange={(e) => setUserType(e.target.value)}>
                            {allTypes.map((type, index) => (
                                <option key={index} value={type.type_ID}>
                                    {type.type_Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 mx-auto">
                        <label className="form-label"><br></br>Department:</label>
                        <select className="form-select" onChange={(e) => setDepartment(e.target.value)}>
                            {allDepartments.map((department, index) => (
                                <option key={index} value={department.department_ID}>
                                    {department.department_Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-md-4 mx-auto">
                        <label className="form-label"><br></br>Customer:</label>

                        <select className="form-select" onChange={(e) => setCompany(e.target.value)}>
                            {allCompanies.map((company, index) => (
                                <option key={index} value={company.custCompany_ID}>
                                    {company.custCompany_Name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type="button" className="btn btn-primary mt-3" onClick={checkFields}>
                        Create Account
                    </button>

                </form>
                <p className="mt-3 text-danger">{errorMessage}</p>
            </div>
        </div>
    );
}
