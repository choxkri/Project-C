
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSort } from 'react-icons/fa';
import { GoTriangleRight } from "react-icons/go";
import { CombinedNavMenu } from './NavMenuCombined';

export function UnassignedTickets() {
    const [myTickets, setMyTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const [successMessage, setSuccessMessage] = useState('');

    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('Open');

    const navigate = useNavigate();

    const getTickets = async () => {
        try {
            const response = await fetch(`ticket/GetUnassignedTickets/${userData.departmentID}`);
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

            const response = await fetch(`ticket/AssignTicketToSelf/${userData.accountID}/${ticketId}`);
            const data = await response.text();
            setSuccessMessage(data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
        await getTickets();
    };

    const renderTicketsTable = () => {
        const filteredTickets = myTickets
            .filter((ticket) =>
                (ticket.ticketName && ticket.ticketName.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (ticket.machineName && ticket.machineName.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (ticket.ticketID && ticket.ticketID.toString().toLowerCase().includes(searchTerm.toLowerCase()))
            )
            .filter((ticket) => selectedStatus === 'All' || (ticket.status && selectedStatus === 'Open') || (!ticket.status && selectedStatus === 'Closed'));
        return (
            <div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                Search:
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by Ticket/Machine Name"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                 
                </div>
                <table className="table  table-hover">
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
                        <th onClick={() => sortTickets('machineName')}>
                            Machine Name
                            {sortColumn === 'machineName' && <FaSort />}
                        </th>
                        <th onClick={() => sortTickets('ticketDate')}>
                            Date
                            {sortColumn === 'ticketDate' && <FaSort />}
                        </th>
                        <th> Assign </th>
                        <th>See in Detail</th>
                    </tr>
                </thead>
                <tbody>
                        {filteredTickets.map((ticket) => (
                        <tr key={ticket.ticketID}>
                            <td>{ticket.ticketID}</td>
                            <td>{ticket.ticketName}</td>
                            <td>{ticket.machineName}</td>
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
            </div>
        );
    };

    const contents = loading
        ? <p><em>Loading...</em></p>
        : <div className="table-container">
            {renderTicketsTable(myTickets)}
        </div>

    return (
        <div>
            <CombinedNavMenu/>
            {contents}
            <p className="mt-3 text-success">{successMessage}</p>
        </div>
    );
}
