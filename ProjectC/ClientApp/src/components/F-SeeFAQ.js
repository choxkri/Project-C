import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import { Link , useLocation } from 'react-router-dom';
import { useEffect , useState } from 'react';


export function SeeFAQ() {
    const [myTickets, setMyTickets] = useState([]);
    const [machine, setMachine] = useState(null);
    const [ticketsPerDay, setTicketsPerDay] = useState([]);
    const [userData, setUserData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null); // Updated state for selected ticket ID
    const location = useLocation();

    const uniqueDates = [...new Set(myTickets.map(ticket => ticket.ticketDate.substring(0, 10)))].sort((a, b) => new Date(b) - new Date(a));

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        setUserData(storedUserData);
        const storedMachine = JSON.parse(localStorage.getItem('machine'));
        setMachine(storedMachine);
    }, []);

    useEffect(() => {
        if (userData && machine) {
            getTicketsByMachineID();
        }
    }, [machine]);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);

        const selectedDateTickets = myTickets.filter(ticket => ticket.ticketDate.startsWith(selectedDate));
        setTicketsPerDay(selectedDateTickets);
        setSelectedTicket(null); // Reset selected ticket ID when date changes
    };

    const handleTicketChange = (e) => {
        console.log(e.target.value);
        const selectedTicketID = parseInt(e.target.value, 10);
        console.log(selectedTicketID);
        const selectedTicket = ticketsPerDay.find((ticket) => ticket.ticketID === selectedTicketID);
        setSelectedTicket(selectedTicket);
    };
   

    const getTicketsByMachineID = async () => {
        try {
            const response = await fetch(`ticket/GetTicketGroupedByDate/${userData.accountID}/${machine.machineID}`);
            const data = await response.json();
            setMyTickets(data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    return (
        <div>
           
            <FieldEmployeeNavMenu />

            <div className="rectangletiny">
            <label> Date of Ticket:</label>
                <div className="col-md-4 mx-auto">
                    <select className="form-select" onChange={handleDateChange}>
                        <option >Select a date</option>
                        {uniqueDates.map(date => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

                <br></br>
            <div> 
                {selectedDate && (
                    <div className="rectangletiny">
                        <label>Name of Ticket:</label>
                    <div className="col-md-4 mx-auto">
                        <select className="form-select" onChange={handleTicketChange}>
                            <option>Select a ticket name</option>
                            {ticketsPerDay.map(ticket => (
                                <option key={ticket.ticketID} value={ticket.ticketID}>
                                    {ticket.ticketName}
                                </option>
                            ))}
                        </select>
                        </div>
                    </div>
                )}
            </div>
            <div> 
                    {selectedTicket && (
                    <>  <div className="rectanglelong">
                        <div className="container ">
                            <table className="table  table-hover" aria-labelledby="tableLabel">
                                <tbody>
                                   
                                    <tr>
                                        <td>Ticket Problem:</td>
                                        <td>{selectedTicket.ticketName}</td>
                                    </tr>
                                   
                                  
                                    
                                    <tr>
                                        <td>Explanation of problem:</td>
                                        <td>{selectedTicket.ticketMessage}</td>
                                    </tr>
                                  
                                    <tr>
                                        <td>Expected Result: </td>
                                        <td>{selectedTicket.expectedResultExplanation}</td>
                                    </tr>
                                    <tr>
                                        <td>Potential Solution: </td>
                                        <td>{selectedTicket.howToFixExplanation}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                            </div>
                        </>
                    )}
                
            </div>
            <div>
                {/*{selectedTicket && (*/}
                {/*    <> */}
                        <div className="rectanglelong container">
                            {/*<p className="text-center"> Select a date and then select a problem</p>*/}
                            <br></br>
                            <div className="d-flex flex-column align-items-center">
                                <div className="mb-3">
                                    <Link to={`/F-MakeTicket`} className="btn btn-primary">Make Ticket</Link>
                                </div>
                                <div className="mb-3">
                                    <Link to="/FieldEmployeeMenu" className="btn btn-secondary">Go Back</Link>
                                </div>
                            </div>
                        </div>
                    {/*</>*/}
                {/*)}*/}

            </div>
             
           
                </div> 
            
    );
}

