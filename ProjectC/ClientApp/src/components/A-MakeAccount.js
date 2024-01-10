
import React, { useState, useEffect } from 'react';
import { AdminNavMenu } from './AdminNavMenu';
import {  useLocation, useNavigate } from 'react-router-dom';

export function MakeAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [userType, setUserType] = useState(1);
    const [company, setCompany] = useState(1);
    const [department, setDepartment] = useState(1);
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const [allCompanies, setAllCompanies] = useState([]);
    const [allDepartments, setAllDepartments] = useState([]);
    const [allTypes, setAllTypes] = useState([]);

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [numberError, setNumberError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
 
    const location = useLocation();
    const navigate = useNavigate();

    const recentlyCreated = location.state && location.state.recentlyCreated;

    const validateUsername = (value) => {
        if (value.length < 6 || value.length > 40) {
            setUsernameError('Username must be between 6 and 40 characters.');
        } else {
            setUsernameError('');
        }
    };

    const validatePassword = (value) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(value)) {
            setPasswordError('Password must contain a capital letter, a number, and be at least 6 characters.');
        } else {
            setPasswordError('');
        }
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError('Enter a valid email address.');
        } else {
            setEmailError('');
        }
    };

    const validateNumber = (value) => {
        const numberRegex = /^\d+$/;
        if (!numberRegex.test(value)) {
            setNumberError('Phone number must not contain alphabetic characters.');
        } else {
            setNumberError('');
        }
    };

    const validateConfirmPassword = (value) => {
        if (value !== password) {
            setConfirmPasswordError('Passwords do not match.');
        } else {
            setConfirmPasswordError('');
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        validateConfirmPassword(value);
    };
    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        validateUsername(value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
        if (passwordError === "") {
            setPassword(value);
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    };

    const handleNumberChange = (e) => {
        const value = e.target.value;
        setNumber(value);
        validateNumber(value);
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
        if (!username || !password || !email || !number || !confirmPassword) {
            setErrorMessage('Please fill in all the fields.');
        }
        else if (
            !usernameError && !passwordError &&  !emailError && !numberError && !confirmPasswordError
        ) {
            setErrorMessage("");
            createAccount();
        } else {
            setErrorMessage('Please fix all validation errors before creating an account.');
        }
    };
  

    const createAccount = async () => {
        try {
            const response = await fetch(`account/${username}/${password}/${number}/${email}/${company}/${department}/${userType}`);
            const data = await response.text();
            window.location.reload();
            navigate(`/A-MakeAccount`, { state: { recentlyCreated: true } });
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
            {recentlyCreated&& (
                <div className="alert alert-success" role="alert">
                    Account created successfully!
                </div>
            )}
            <div className="rectanglelong">
                <h1>Create Account</h1>
                <form >
                    <div className={`col-md-4 mx-auto`}>
                        <label className="form-label"><br></br>Username: *</label>
                        <input
                            type="text"
                            className={`form-control ${usernameError ? 'is-invalid' : username ? 'is-valid' : ''}`}
                            placeholder="Enter your username"
                            onChange={handleUsernameChange}
                        />
                        <div className="invalid-feedback">{usernameError}</div>
                    </div>
                    <div className={`col-md-4 mx-auto`}>
                        <label className="form-label"><br></br>Password: *</label>
                        <input
                            type="password"
                            className={`form-control ${passwordError ? 'is-invalid' : password ? 'is-valid' : ''}`}
                            placeholder="Enter your password"
                            onChange={handlePasswordChange}
                        />
                        <div className="invalid-feedback">{passwordError}</div>
                    </div>
                    <div className={`col-md-4 mx-auto`}>
                        <label className="form-label"><br></br>Confirm Password: *</label>
                        <input
                            type="password"
                            className={`form-control ${confirmPasswordError ? 'is-invalid' : confirmPassword ? 'is-valid' : ''}`}
                            placeholder="Confirm your password"
                            onChange={handleConfirmPasswordChange}
                        />
                        <div className="invalid-feedback">{confirmPasswordError}</div>
                    </div>
                    <div className={`col-md-4 mx-auto`}>
                        <label className="form-label"><br></br>E-Mail: *</label>
                        <input
                            type="email"
                            className={`form-control ${emailError ? 'is-invalid' : email ? 'is-valid' : ''}`}
                            placeholder="Enter your email"
                            onChange={handleEmailChange}
                        />
                        <div className="invalid-feedback">{emailError}</div>
                    </div>
                    <div className={`col-md-4 mx-auto`}>
                        <label className="form-label"><br></br>Phone Number: *</label>
                        <input
                            type="text"
                            className={`form-control ${numberError ? 'is-invalid' : number ? 'is-valid' : ''}`}
                            placeholder="Enter your phone number"
                            onChange={handleNumberChange}
                        />
                        <div className="invalid-feedback">{numberError}</div>
                    </div>
                    <div className="col-md-4 mx-auto">
                        <label className="form-label"><br></br>User Type:</label>
                        <select className="form-select" onChange={(e) => setUserType(e.target.value)}>
                            {allTypes.map((type, index) => (
                                <option key={index} value={type.typeID}>
                                    {type.typeName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 mx-auto">
                        <label className="form-label"><br></br>Department:</label>
                        <select className="form-select" onChange={(e) => setDepartment(e.target.value)}>
                            {allDepartments.map((department, index) => (
                                <option key={index} value={department.departmentID}>
                                    {department.departmentName}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="col-md-4 mx-auto">
                        <label className="form-label"><br></br>Company:</label>

                        <select className="form-select" onChange={(e) => setCompany(e.target.value)}>
                            {allCompanies.map((company, index) => (
                                <option key={index} value={company.custCompanyID}>
                                    {company.custCompanyName}
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
