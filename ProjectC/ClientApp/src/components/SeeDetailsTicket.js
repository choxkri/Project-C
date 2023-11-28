import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function SeeDetailsTicket() {
    const [myTicket, setMyTicket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        setUserData(storedUserData);
        const storedTicketData = JSON.parse(localStorage.getItem('ticket'));
        setMyTicket(storedTicketData);
    }, []);

    const test = () => {
        console.log("My Ticket:", myTicket);
        console.log("User Data:", userData);
    };

    const handleNavigateBack = () => {
        navigate(-1);
    };

    const handleFixStatus = () => {
        setMyTicket((prevTicket) => ({
            ...prevTicket,
            status: false,
        }));
        console.log(myTicket);
        changeStatus();
    };

    const changeStatus = async () => {
        try {
          
            const response = await fetch(`ticket/ChanceStatusTicket/${myTicket.ticket_ID}/${myTicket.status}`);
            const data = await response.text();
            setSuccessMessage(data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    return (
        <div>
            <FieldEmployeeNavMenu />
            <div className="rectanglesmall">
                <h1>See problem in detail (not done)</h1>
                {myTicket && (
                    <>
                        <p>ID: {myTicket.ticket_ID}</p>
                        <p>ticket name: {myTicket.ticket_Name}</p>
                        <p>
                            Status: <span id="status">{myTicket.status ? 'Open' : 'Closed'}</span>
                        </p>
                        <p>ticket message: {myTicket.ticket_Message}</p>
                        <p>Creator (just id for now): {myTicket.creatorID}</p>
                        <p>ticket date: {myTicket.ticket_Date}</p>
                        <p>Machine (just id for now): {myTicket.machineID}</p>
                    </>
                )}
                {userData && userData.typeAccountID === 1 && (
                    <>
                        <button onClick={handleFixStatus}>Fix Status (click twice for now) </button>
                        <p className="mt-3 text-success">{successMessage}</p>
                    </>
                )}
                <button onClick={handleNavigateBack}>Go Back</button>
                <button onClick={test}>Test</button>
            </div>
        </div>
    );
}