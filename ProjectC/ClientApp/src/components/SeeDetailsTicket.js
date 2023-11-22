
import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
export function SeeDetailsTicket() {
    const [myTicket, setMyTicket] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);


  

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        setUserData(storedUserData);
        const storedTicketData = JSON.parse(localStorage.getItem('ticket'));
        setMyTicket(storedTicketData);
      
    }, []);

    
    const test = () => {

        console.log(myTicket);
        console.log(userData);
    };



    return (
        <div>
            <FieldEmployeeNavMenu />
            <p> Here you can see the ticketsin detail</p>
            <button onClick={() => test()}>Stest</button>
        </div>
    );
}
