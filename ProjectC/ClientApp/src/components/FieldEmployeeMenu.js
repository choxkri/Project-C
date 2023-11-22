import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import { Link } from 'react-router-dom';
import './F.css';
import React, { useState, useEffect } from 'react';


export function FieldEmployeeMenu() {
    const [machine, setMachine] = useState(null);
    const [allMachines, setAllMachines] = useState([]);
    const [userData, setUserData] = useState(null);

    const getMachines = async () => {
        try {
            const response = await fetch(`account/GetMachinesFromUser/${userData.account_ID}`);
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
        }
    }, [userData]);

    const handleMachineChange = (e) => {
        const selectedMachineID = parseInt(e.target.value, 10);
        console.log(selectedMachineID);
        console.log(typeof selectedMachineID);
        const selectedMachine = allMachines.find((machine) => machine.machine_ID === selectedMachineID);
        console.log(selectedMachine);
        console.log(allMachines);
        setMachine(selectedMachine);
        localStorage.setItem('machine', JSON.stringify(selectedMachine));
    };
 

    return (
        <div>
            <FieldEmployeeNavMenu />
            <div className="rectanglesmall">
                <h1>Make A Ticket</h1>
                <div className="text-container">
                    <p>
                        Before making a ticket, you will answer a couple of frequently asked problems to see if you can already fix the issue yourself.
                    </p>
                    <p>
                        First, select the machine you want to make a ticket for. 
                    </p>
                </div>

                <div className="col-md-4 mx-auto">
                    <label className="form-label"><br />Your Machine:</label>
                    <select className="form-select" onChange={handleMachineChange} >
                        {allMachines.map((machine, index) => (
                            <option key={index} value={machine.machine_ID}>
                                {machine.machine_Name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="text-center mt-3">
                   
                    <Link to={`/F-SeeFAQ`} className="btn btn-primary">See recurring problems works</Link>
                    
                </div>
            </div>
        </div>
    );
}
