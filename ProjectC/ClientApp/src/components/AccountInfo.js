import React, { useState, useEffect } from 'react';
import './F.css';

export function AccountInfo() {
     const [userData, setUserData] = useState(null);
    const [accountInfo, setAccountInfo] = useState(null);

    const getInfo = async () => {
        try {
            const response = await fetch(`account/GetAllInfoOfUser/${userData.accountID}`);
            const data = await response.json();
            if (data) {
                setAccountInfo(data);
            }
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    useEffect(() => {

        const storedUserData = JSON.parse(localStorage.getItem('user'));
        setUserData(storedUserData);
    }, []); 

    useEffect(() => {

        getInfo();
    }, []); 

    return (
        <div>
            <div className="rectanglesmall">
                <h1>accountInfoTest</h1>
                {accountInfo && (
                    <>
                        <p>Name: {accountInfo.name}</p>
                        <p>Password: {accountInfo.password}</p>
                        <p>Email: {accountInfo.email}</p>
                        <p>Phone Number: {accountInfo.number}</p>
                        <p>Department: {accountInfo.department}</p>
                        <p>Type: {accountInfo.type}</p>
                    </>
                )}
            </div>
        </div>
    );
}
