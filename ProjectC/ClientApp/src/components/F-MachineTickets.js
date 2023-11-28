
import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSort } from 'react-icons/fa';
import { FaAccessibleIcon } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";

export function MachineTickets() {
    const [myTickets, setMyTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');

    const [machine, setMachine] = useState(null);
    const [allMachines, setAllMachines] = useState([]);

    const navigate = useNavigate();

    const getTickets = async () => {
        if (machine) {
            try {
                console.log("yowzer");
                console.log(machine.machine_ID);
                const response = await fetch(`ticket/GetTicketsByMacineID/${machine.machine_ID}`);
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
        if (allMachines) {
            getTickets();
            
        }
    }, [allMachines]);

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

    const handleMachineChange = async (e) => {

        console.log(machine.machine_ID);
        const selectedMachineID = parseInt(e.target.value, 10);
        const selectedMachine = allMachines.find((machine) => machine.machine_ID === selectedMachineID);

        setMachine(selectedMachine);
        localStorage.setItem('machine', JSON.stringify(selectedMachine));
        setLoading (true);
        
        await getTickets();
    };

    const renderTicketsTable = () => {
        if (machine) {
            const filteredTickets = myTickets.filter(ticket => ticket.machineID === machine.machine_ID);
            return (
                <table className="table  table-hover" aria-labelledby="tableLabel">
                    <thead className="thead-dark">
                        <tr>
                            <th onClick={() => sortTickets('ticket_ID')}>
                                ID
                                {sortColumn === 'ticket_ID' && <FaSort />}
                            </th>
                            <th onClick={() => sortTickets('ticket_Name')}>
                                Name
                                {sortColumn === 'ticket_Name' && <FaSort />}
                            </th>
                            <th onClick={() => sortTickets('status')}>
                                Status
                                {sortColumn === 'status' && <FaSort />}
                            </th>
                            <th onClick={() => sortTickets('machineID')}>
                                Machine ID
                                {sortColumn === 'machineID' && <FaSort />}
                            </th>
                            <th onClick={() => sortTickets('ticket_Date')}>
                                Date
                                {sortColumn === 'ticket_Date' && <FaSort />}
                            </th>
                            <th>See in Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTickets.map((ticket) => (
                            <tr key={ticket.ticket_ID}>
                                <td>{ticket.ticket_ID}</td>
                                <td>{ticket.ticket_Name}</td>
                                <td className={ticket.status ? 'text-success' : 'text-danger'}>
                                    {ticket.status ? 'Open' : 'Closed'}
                                </td>
                                <td>{ticket.machineID}</td>
                                <td>{ticket.ticket_Date ? new Date(ticket.ticket_Date).toLocaleString() : 'N/A'}</td>
                                <td>
                                    <button onClick={() => goToDetails(ticket)}>See Details<GoTriangleRight /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            );
        }
    };

    const contents = loading
        ? <p><em>Loading...</em></p>
        : renderTicketsTable(myTickets);

    return (
        <div>
            <FieldEmployeeNavMenu />
            <p> here you can see the tickets that are linked to one of your machines. not working properly yet.</p>
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
            {contents}
        </div>
    );
}
