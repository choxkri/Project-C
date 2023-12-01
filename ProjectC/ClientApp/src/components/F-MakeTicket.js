import React, { useState , useEffect } from 'react';
import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import { Link, useLocation } from 'react-router-dom';

export function MakeTicket() {
    const location = useLocation();
   
    const [machine, setMachine] = useState(null);
    const [ticketProblem, setTicketProblem] = useState('');
    const [problemDetails, setProblemDetails] = useState('');
    const [extraInfo, setExtraInfo] = useState('wwe');
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const [triedExplanation, setTriedExplanation] = useState('');
    const [expectedResult, setExpectedResult] = useState('');

    const [ticketProblemError, setTicketProblemError] = useState('');
    const [problemDetailsError, setProblemDetailsError] = useState('');
    const [triedExplanationError, setTriedExplanationError] = useState('');
    const [expectedResultError, setExpectedResultError] = useState('');

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        console.log(storedUserData);
        setUserData(storedUserData);
        const storedMachine = JSON.parse(localStorage.getItem('machine'));
        setMachine(storedMachine);
        console.log(storedMachine);
    }, []);

    const checkFields = () => {
        console.log(machine);
        if (ticketProblem === '') {
            setErrorMessage('Ticket Problem  field is not allowed to be empty.');
        } else if (problemDetails === '') {
            setErrorMessage('Problem Details field is not allowed to be empty.');
        } else if (extraInfo === '') {
            setErrorMessage('Extra Info field is not allowed to be empty.');
        } else if (triedExplanation === '') {
            setErrorMessage('Tried Explanation field is not allowed to be empty.');
        } else if (expectedResult === '') {
            setErrorMessage('Expected Result field is not allowed to be empty.');
        } else {
            setErrorMessage('');
            createAccount();
        
            
        }
    };
    const createAccount = async () => {
        console.log(`Ticket Problem: ${ticketProblem}`);
        console.log(`Problem Details: ${problemDetails}`);
        console.log(`Extra Info: ${extraInfo}`);
        console.log(userData.account_ID);
        console.log(machine.machine_ID);
        console.log(machine);
        try {

            //const response = await fetch(`/ticket/${ticketProblem}/${problemDetails}/${userData.account_ID}/${machine.machine_ID}`);
            const response = await fetch(`/ticket/${ticketProblem}/${problemDetails}/${extraInfo}/${userData.account_ID}/${machine.machine_ID}`);
            //const response = await fetch(`ticket/GetTicketsByAccountID/${userData.account_ID}`);
    
            const data = await response.text();
            setErrorMessage(data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };


    const validateTicketProblem = (value) => {
        if (value.length < 6 || value.length > 40) {
            setTicketProblemError('Ticket Problem must be between 6 and 40 characters.');
        } else {
            setTicketProblemError('');
        }
    };

   

    const handleTicketProblemChange = (e) => {
        const value = e.target.value;
        setTicketProblem(value);
        validateTicketProblem(value);
    };
   
    const validateField = (value, setErrorFunction, fieldName) => {
        if (value.length < 5 || value.length > 100) {
            setErrorFunction(`${fieldName} must be between 5 and 1000 characters.`);
        } else {
            setErrorFunction('');
        }
    };

    const handleProblemDetailsChange = (e) => {
        const value = e.target.value;
        setProblemDetails(value);
        validateField(value, setProblemDetailsError, 'Problem Details');
    };

    const handleTriedExplanationChange = (e) => {
        const value = e.target.value;
        setTriedExplanation(value);
        validateField(value, setTriedExplanationError, 'Tried Explanation');
    };

    const handleExpectedResultChange = (e) => {
        const value = e.target.value;
        setExpectedResult(value);
        validateField(value, setExpectedResultError, 'Expected Result');
    };

    return (
        <div>
            <FieldEmployeeNavMenu />
            <div className="rectanglelong">
                <h1>Create Ticket for {machine ? machine.machine_Name : ''} </h1>
                <form className="col-md-6 mx-auto">
                    <div className="form-group">
                        <label><br></br>Ticket Problem: </label>
                        <input
                            type="text"
                            className={`form-control ${ticketProblemError ? 'is-invalid' : ticketProblem ? 'is-valid' : ''}`}
                            placeholder="Enter your ticket problem"
                            onChange={handleTicketProblemChange}
                        />
                        <div className="invalid-feedback">{ticketProblemError}</div>
                    </div>
                    <div className="form-group">
                        <label><br />Explain Problem in Detail</label>
                        <textarea
                            className={`form-control ${problemDetailsError ? 'is-invalid' : problemDetails ? 'is-valid' : ''}`}
                            rows="3"
                            placeholder="Provide detailed explanation of the problem"
                           
                            onChange={handleProblemDetailsChange}
                        ></textarea>
                        <div className="invalid-feedback">{problemDetailsError}</div>
                    </div>

                    <div className="form-group">
                        <label><br />Explain What You Have Tried</label>
                        <textarea
                            className={`form-control ${triedExplanationError ? 'is-invalid' : triedExplanation ? 'is-valid' : ''}`}
                            rows="3"
                            placeholder="Explain what you have tried to resolve the issue"
                         
                            onChange={handleTriedExplanationChange}
                        ></textarea>
                        <div className="invalid-feedback">{triedExplanationError}</div>
                    </div>

                    <div className="form-group">
                        <label><br />Expected Result</label>
                        <textarea
                            className={`form-control ${expectedResultError ? 'is-invalid' : expectedResult ? 'is-valid' : ''}`}
                            rows="3"
                            placeholder="Describe the result that you expected to happen"
                         
                            onChange={handleExpectedResultChange}
                        ></textarea>
                        <div className="invalid-feedback">{expectedResultError}</div>
                    </div>

                    <div className="form-group">
                        <label><br></br>Show Machine</label>
                        <input
                            type="file"
                            className="form-control"
                            accept=".jpg, .jpeg, .png, "
                        />

                    </div>
                    {/*<button type="submit" className="btn btn-default">*/}
                    {/*    Submit*/}
                    {/*</button>*/}
                    <button type="button" className="btn btn-primary mt-3" onClick={checkFields}>
                        Create Ticket
                    </button>
                </form>
                <p className="mt-3 text-danger">{errorMessage}</p>
            </div>
        </div>
    );
}
