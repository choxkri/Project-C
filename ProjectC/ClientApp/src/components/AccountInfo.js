import React, { useState, useEffect } from 'react';
import './F.css';
import Account from './Account';

export function AccountInfo() {
    const [accountInfo, setAccountInfo] = useState(null);

    const getInfo = async () => {
        try {
            const response = await fetch(`accountviscon/GetAllInfoOfUser/${Account.account.accountViscon_ID}`);
            const data = await response.json();
            if (data) {
                setAccountInfo(data);
            }
        } catch (error) {
            console.error('Error fetching account data:', error);
        }
    };

    useEffect(() => {
        getInfo();
        // Call getInfo when the component mounts
    }, []); // Empty dependency array ensures it only runs once

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
