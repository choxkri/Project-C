import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSort } from 'react-icons/fa';
import { FaAccessibleIcon } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";

export function MyTickets() {
    const [myTickets, setMyTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const navigate = useNavigate();

    const getTickets = async () => {
        try {
            const response = await fetch(`ticket/GetTicketsByAccountID/${userData.accountID}`);
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
        if (column === 'status') {
            sortedTickets = [...myTickets].sort((a, b) => {
                const statusA = a[column] ? 'Open' : 'Closed';
                const statusB = b[column] ? 'Open' : 'Closed';

                if (sortOrder === 'asc') {
                    return statusA < statusB ? 1 : -1; // Reverse the order here
                } else {
                    return statusA > statusB ? 1 : -1; // Reverse the order here
                }
            });
        } else {
            // For other columns, perform the generic sorting
            

            sortedTickets = [...myTickets].sort((a, b) => {
                if (order === 'asc') {
                    return a[column] > b[column] ? 1 : -1;
                } else {
                    return a[column] < b[column] ? 1 : -1;
                }
            });
        }

        setMyTickets(sortedTickets);
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
                        <th onClick={() => sortTickets('status')}>
                            Status 
                            {sortColumn === 'status' && <FaSort />}
                        </th>
                        <th onClick={() => sortTickets('machineID')}>
                            Machine ID
                            {sortColumn === 'machineID' && <FaSort />}
                        </th>
                        <th onClick={() => sortTickets('ticketDate')}>
                            Date
                            {sortColumn === 'ticketDate' && <FaSort />}
                        </th>
                        <th>See in Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {myTickets.map((ticket) => (
                        <tr key={ticket.ticketID}>
                            <td>{ticket.ticketID}</td>
                            <td>{ticket.ticketName}</td>
                            <td className={ticket.status ? 'text-success' : 'text-danger'}>
                                {ticket.status ? 'Open' : 'Closed'}
                            </td>
                            <td>{ticket.machineID}</td>
                            <td>{ticket.ticketDate ? new Date(ticket.ticketDate).toLocaleString() : 'N/A'}</td>
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
            <FieldEmployeeNavMenu />
            
               
            <p> Here you can see the tickets that you have made.</p><FaAccessibleIcon /><FaAccessibleIcon /><FaAccessibleIcon /><FaAccessibleIcon />
                    {contents}
           
        </div>
    );
}
