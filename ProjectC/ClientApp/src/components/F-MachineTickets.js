
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSort } from 'react-icons/fa';
import { GoTriangleRight } from "react-icons/go";
import { CombinedNavMenu } from './NavMenuCombined';

export function MachineTickets() {
    const [myTickets, setMyTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const [machine, setMachine] = useState(null);
    const [allMachines, setAllMachines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('Open');

    const navigate = useNavigate();

    const getTickets = async () => {
        if (machine) {
            try {
            
                const response = await fetch(`ticket/GetTicketsByMacineID/${machine.machineID}`);
                const data = await response.json();
                setMyTickets(data);
                setLoading(false);

            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        }
    };
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
        if (machine) {
            getTickets();
        }
    }, [machine]);


    useEffect(() => {
        if (userData) {
            getMachines();
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
                    return statusA < statusB ? 1 : -1;
                } else {
                    return statusA > statusB ? 1 : -1; 
                }
            });
        } else {
           

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

        const filteredTickets = myTickets
            .filter((ticket) =>
                (ticket.ticketName && ticket.ticketName.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
                (ticket.machineName && ticket.machineName.toString().toLowerCase().includes(searchTerm.toLowerCase()))
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

                    <div className="col-md-2">
                        <div className="input-group mb-3">
                            <label className="input-group-text" >
                                Status:
                            </label>
                            <select
                                className="form-select"
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                            >
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                                <option value="All">All</option>
                            </select>
                        </div>
                    </div>
                </div>


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
                  
                            <th onClick={() => sortTickets('ticketDate')}>
                                Date
                                {sortColumn === 'ticketDate' && <FaSort />}
                            </th>
                            <th>See in Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.map((ticket) => (
                            <tr key={ticket.ticketID}>
                                <td>{ticket.ticketID}</td>
                                <td>{ticket.ticketName}</td>
                                <td className={ticket.status ? 'text-success' : 'text-danger'}>
                                    {ticket.status ? 'Open' : 'Closed'}
                                </td>
                         
                                <td>{ticket.ticketDate ? new Date(ticket.ticketDate).toLocaleString() : 'N/A'}</td>
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
            <CombinedNavMenu />
            <div className="col-md-4 mx-auto">
                <div className="input-group mb-3">
                <span className="input-group-text">
                    Machine:
                    </span>
                
                <select
                    className="form-select"
                    onChange={(e) => {
                        const selectedMachineID = parseInt(e.target.value, 10);
                        const selectedMachine = allMachines.find(machine => machine.machineID === selectedMachineID);
                        setMachine(selectedMachine);
                    }}
                >
                    {allMachines.map((machine, index) => (
                        <option key={index} value={machine.machineID}>
                            {machine.machineName}
                        </option>
                    ))}
                </select>
                </div>
            </div>
            {contents}
        </div>
    );
}
