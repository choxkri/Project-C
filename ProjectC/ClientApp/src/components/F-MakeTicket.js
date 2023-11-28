import React, { useState , useEffect } from 'react';
import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import { Link, useLocation } from 'react-router-dom';

export function MakeTicket() {
    const location = useLocation();
   
    const [machine, setMachine] = useState(null);
    const [ticketProblem, setTicketProblem] = useState('');
    const [problemDetails, setProblemDetails] = useState('');
    const [extraInfo, setExtraInfo] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState(null);

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

    return (
        <div>
            <FieldEmployeeNavMenu />
            <div className="rectanglelong">
                <h1>Create Ticket for {machine ? machine.machine_Name : ''} </h1>
                <form className="col-md-6 mx-auto">
                    <div className="form-group">
                        <label><br></br>Ticket Problem</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter the ticket problem"
                            value={ticketProblem}
                            onChange={(e) => setTicketProblem(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label><br></br>Explain Problem in Detail</label>
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Provide detailed explanation of the problem"
                            value={problemDetails}
                            onChange={(e) => setProblemDetails(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label><br></br>Extra</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter additional information"
                            value={extraInfo}
                            onChange={(e) => setExtraInfo(e.target.value)}
                        />
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
