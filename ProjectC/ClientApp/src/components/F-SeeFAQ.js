
import { Link  } from 'react-router-dom';
import { useEffect , useState } from 'react';
import { CombinedNavMenu } from './NavMenuCombined';


export function SeeFAQ() {
    const [myTickets, setMyTickets] = useState([]);
    const [machine, setMachine] = useState(null);
    const [ticketsPerDay, setTicketsPerDay] = useState([]);
    const [userData, setUserData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null); 

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
        setSelectedTicket(null); 
    };

    const handleTicketChange = (e) => {
      
        const selectedTicketID = parseInt(e.target.value, 10);
       
        const selectedTicket = ticketsPerDay.find((ticket) => ticket.ticketID === selectedTicketID);
        setSelectedTicket(selectedTicket);
    };
   

    const getTicketsByMachineID = async () => {
        try {
            const response = await fetch(`ticket/GetSolvedTicketsByMachineID/${machine.machineID}`);
            const data = await response.json();
            setMyTickets(data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    return (
        <div>
           
            <CombinedNavMenu />

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
              
                        <div className="rectanglelong container">
                          
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
                 

            </div>
             
           
                </div> 
            
    );
}

