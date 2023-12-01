import { ServiceEmployeeNavMenu } from './ServiceEmployeeNavMenu';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSort } from 'react-icons/fa';
import { FaAccessibleIcon } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";

export function UnassignedTickets() {
    const [myTickets, setMyTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const [successMessage, setSuccessMessage] = useState('');

    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const navigate = useNavigate();

    const getTickets = async () => {
        try {
            const response = await fetch(`ticket/GetUnassignedTickets`);
            const data = await response.json();
            setMyTickets(data);
            setLoading(false);

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
            getTickets();
        }
    }, [userData]);

    const goToDetails = (ticket) => {

        localStorage.setItem('ticket', JSON.stringify(ticket));
        navigate(`/SeeDetailsTicket`);
    };

    const sortTickets = (column) => {
        let sortedTickets;
        const order = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortColumn(column);
        setSortOrder(order);
       


            sortedTickets = [...myTickets].sort((a, b) => {
                if (order === 'asc') {
                    return a[column] > b[column] ? 1 : -1;
                } else {
                    return a[column] < b[column] ? 1 : -1;
                }
            });
       

        setMyTickets(sortedTickets);
    };

    

    const assignTicket = async (ticketId) => {
        try {
            setSuccessMessage();
            console.log(ticketId);
            console.log(userData.account_ID);
            const response = await fetch(`ticket/AssignTicketToSelf/${userData.accountID}/${ticketId}`);
            const data = await response.text();
            setSuccessMessage(data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
        await getTickets();
    };

    const renderTicketsTable = () => {
        return (
            <table className="table  table-hover" aria-labelledby="tableLabel">
                <thead className="thead-dark">
                    <tr>
                        <th onClick={() => sortTickets('ticketID')}>
                            ID
                            {sortColumn === 'ticketID' && <FaSort />}
                        </th>
                        <th onClick={() => sortTickets('ticketName')}>
                            Name
                            {sortColumn === 'ticketName' && <FaSort />}
                        </th>
                        <th onClick={() => sortTickets('machineID')}>
                            Machine ID
                            {sortColumn === 'machineID' && <FaSort />}
                        </th>
                        <th onClick={() => sortTickets('ticketDate')}>
                            Date
                            {sortColumn === 'ticketDate' && <FaSort />}
                        </th>
                        <th onClick={() => sortTickets('assign')}>
                            Assign
                            {sortColumn === 'assign' && <FaSort />}
                        </th>
                        <th>See in Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {myTickets.map((ticket) => (
                        <tr key={ticket.ticketID}>
                            <td>{ticket.ticketID}</td>
                            <td>{ticket.ticketName}</td>
                            <td>{ticket.machineID}</td>
                            <td>{ticket.ticketDate ? new Date(ticket.ticketDate).toLocaleString() : 'N/A'}</td>
                            <td>
                                <button onClick={() => assignTicket(ticket.ticketID)}>Assign</button>
                            </td>
                            <td>
                                <button onClick={() => goToDetails(ticket)}>See Details<GoTriangleRight /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const contents = loading
        ? <p><em>Loading...</em></p>
        : renderTicketsTable(myTickets);

    return (
        <div>
            <ServiceEmployeeNavMenu />
            <p> Here you can see the tickets that are unassigned.</p><FaAccessibleIcon /><FaAccessibleIcon /><FaAccessibleIcon /><FaAccessibleIcon />
            {contents}
            <p className="mt-3 text-success">{successMessage}</p>
        </div>
    );
}
