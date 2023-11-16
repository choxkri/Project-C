import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import { Link } from 'react-router-dom';
import './F.css';
import Account from './Account';
import React, { useState, useEffect } from 'react';

export function FieldEmployeeMenu() {
    const [machine, setMachine] = useState(1);
    const [allMachines, setAllMachines] = useState([]);

    const getMachines = async () => {
        try {
            const response = await fetch(`account/GetMachinesFromUser/${Account.account.account_ID}`);
            const data = await response.json();
            setAllMachines(data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    useEffect(() => {
        getMachines();
    }, []);

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
                    <select className="form-select" onChange={(e) => setMachine(e.target.value)}>
                        {allMachines.map((machine, index) => (
                            <option key={index} value={machine.machine_ID}>
                                {machine.machine_Name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="text-center mt-3">
                    <Link to="/F-SeeFAQ" className="btn btn-primary">See Recurring Problems</Link>
                </div>
            </div>
        </div>
    );
}
