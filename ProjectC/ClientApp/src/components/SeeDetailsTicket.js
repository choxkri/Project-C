import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CombinedNavMenu } from './NavMenuCombined';

export function SeeDetailsTicket() {
    const [myTicket, setMyTicket] = useState([]);
  
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [OtherAccount, setOtherAccount] = useState(null);
    const [allOtherAccount, setAllOtherAccount] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem('user'));
        setUserData(storedUserData);
        const storedTicketData = JSON.parse(localStorage.getItem('ticket'));
        getDetailedTicket(storedTicketData);
        getOtherAccount(storedUserData);
    }, []);

    const getDetailedTicket = async (storedticketData ) => {
        try {
            console.log("woof");
            console.log(storedticketData.ticketID);
            const response = await fetch(`ticket/GetDetailedTicket/${storedticketData.ticketID}`);
            const data = await response.json();
            console.log("cat");
            console.log(data);
            setMyTicket(data);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    const getOtherAccount = async (storedUserdata) => {
        try {
            setOtherAccount(storedUserdata.accountID);
            const response = await fetch(`account/Departmentwithid/${storedUserdata.departmentID}/${storedUserdata.accountID}`);
            const data = await response.json();
            if (data) {
                setAllOtherAccount(data);
            }
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    const test = () => {
        console.log(typeof myTicket);
        console.log('My Ticket:', myTicket);
        console.log('User Data:', userData);
    };

    const handleNavigateBack = () => {
        test();
        navigate(-1);
    };

    const handleFixStatus = async () => {
      
        let newStatus
        if (myTicket.status == true) {
            newStatus = false;
        } else {
            newStatus = true;
        }
        setMyTicket((prevTicket) => ({
            ...prevTicket,
            status: newStatus,
        }));
        changeStatus();
    };

    const handleassignTicket = async () => {
        try {
            setSuccessMessage();
            console.log(myTicket.ticketID);
            console.log(userData.account_ID);
            const response = await fetch(`ticket/AssignTicketToSelf/${OtherAccount}/${myTicket.ticketID}`);
            const data = await response.text();
            setSuccessMessage(data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
        await getDetailedTicket();

        navigate(-1);
    };

    const changeStatus = async () => {
        try {
            const response = await fetch(
                `ticket/ChanceStatusTicket/${myTicket.ticketID}/${myTicket.status}`
            );
            const data = await response.text();
            setSuccessMessage(data);
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };
    
    return (
        <div>
            {userData && (
                <CombinedNavMenu user={userData} />
            )}
            <div className="rectanglelong">
                <h1>Ticket Details</h1>
                {myTicket && (
                    <>
                        <table className="table  table-hover" aria-labelledby="tableLabel">
                            <tbody>
                                <tr>
                                    <td>ID:</td>
                                    <td>{myTicket.ticketID}</td>
                                </tr>
                                <tr>
                                    <td>Ticket Name:</td>
                                    <td>{myTicket.ticketName}</td>
                                </tr>
                                <tr>
                                    <td>Status:</td>
                                    <td>
                                        <span id="status">{myTicket.status ? 'Open' : 'Closed'}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Ticker Creator:</td>
                                    <td>{myTicket.accountName}</td>
                                </tr>
                                <tr>
                                    <td>Ticket Date:</td>
                                    <td>{myTicket.ticketDate}</td>
                                </tr>
                                <tr>
                                    <td>Machine Name :</td>
                                    <td>{myTicket.machineName}</td>
                                </tr>
                                <tr>
                                    <td>Explanation of problem:</td>
                                    <td>{myTicket.ticketMessage}</td>
                                </tr>
                                <tr>
                                    <td>Things { myTicket.accountName} has tried: </td>
                                    <td>{myTicket.triedExplanation}</td>
                                </tr>
                                <tr>
                                    <td>Expected Result: </td>
                                    <td>{myTicket.expectedResultExplanation}</td>
                                </tr>
                                <tr>
                                    <td>Potential Solution: </td>
                                    <td>{myTicket.howToFixExplanation}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
                {userData && userData.typeAccountID === 1 && (
                    <div className="col-md-4 mx-auto">
                        <label className="form-label"><br></br>Account:</label>

                        <select className="form-select" onChange={(e) => setOtherAccount(e.target.value)}>
                            {allOtherAccount.map((account, index) => (
                                <option key={index} value={account.accountID}>
                                    {account.accountName}
                                </option>
                            ))}
                        </select>

                        <button onClick={handleassignTicket}>Assign</button>
                        <p className="mt-3 text-success">{successMessage}</p>
                </div>
                )}
                {userData && userData.typeAccountID === 1 && myTicket.solver !== null && (
                    <>
                        <button onClick={handleFixStatus}>Toggle Status</button>
                        <p className="mt-3 text-success">{successMessage}</p>
                    </>
                )}
                <button onClick={handleNavigateBack}>Go Back</button>
            </div>
            
        </div>
    );
}
