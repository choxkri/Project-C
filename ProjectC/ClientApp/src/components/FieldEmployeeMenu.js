
import { Link } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import { CombinedNavMenu } from './NavMenuCombined';


export function FieldEmployeeMenu() {
    const [machine, setMachine] = useState(null);
    const [allMachines, setAllMachines] = useState([]);
    const [userData, setUserData] = useState(null);

    const getMachines = async () => {
        try {
            const response = await fetch(`account/GetMachinesFromUser/${userData.accountID}`);
            const data = await response.json();
            setAllMachines(data);
            setMachine(data[0]);
            localStorage.setItem('machine', JSON.stringify(data[0]));
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    useEffect(() => {
       
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        setUserData(storedUserData);
        
    }, []);

    useEffect(() => {
        if (userData) {
            getMachines();
            console.log(userData);
        }
    }, [userData]);

    const handleMachineChange = (e) => {
        const selectedMachineID = parseInt(e.target.value, 10);

        const selectedMachine = allMachines.find((machine) => machine.machineID === selectedMachineID);

        setMachine(selectedMachine);
        localStorage.setItem('machine', JSON.stringify(selectedMachine));
    };
 

    return (
        <div>
            <CombinedNavMenu />
            <div className="rectanglesmall">
                <h1>Make A Ticket</h1>
                

                <div className="col-md-4 mx-auto">
                    <label className="form-label"><br />Your Machine:</label>
                    <select className="form-select" onChange={handleMachineChange} >
                        {allMachines.map((machine, index) => (
                            <option key={index} value={machine.machineID}>
                                {machine.machineName}
                            </option>
                        ))}
                    </select>
                </div>
                <p> <br></br><br></br><br></br></p>
                <div className="text-center mt-3">
                    {machine && (
                        <Link to={`/F-MakeTicket`} className="btn btn-primary">
                            Make Ticket
                        </Link>
                    )}
                </div>

                <div className="text-center mt-3">
                    {machine && (
                        <Link to={`/F-SeeFAQ`} className="btn btn-secondary">
                            See recent problems of {machine.machineName}
                        </Link>
                    )}
                </div>

                

            </div>
        </div>
    );
}
