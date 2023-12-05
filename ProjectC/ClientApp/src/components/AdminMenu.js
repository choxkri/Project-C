import React, { useState, useEffect } from 'react';
import { AdminNavMenu } from './AdminNavMenu';
export function AdminMenu() {
    //test on how to get data from database to screen.
    const [forecasts, setForecasts] = useState([]);
    const [loading, setLoading] = useState(true);

   

    

    return (
        <div>
            <AdminNavMenu />
            <h1 id="tableLabel">Admin</h1>
            <p>Admin Menu Page.</p>
           
        </div>
    
    );
}
