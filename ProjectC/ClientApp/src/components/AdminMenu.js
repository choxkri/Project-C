import React, { useState, useEffect } from 'react';
import { AdminNavMenu } from './AdminNavMenu';
export function AdminMenu() {
    //test on how to get data from database to screen.
    const [forecasts, setForecasts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function populateWeatherData() {
            try {
                const response = await fetch('department');
                const data = await response.json();
                setForecasts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        populateWeatherData();
    }, []);

    const renderForecastsTable = (forecasts) => {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        //first letter of field must be NOT caps (even though it is in your class)
                        <tr key={forecast.department_ID}>
                            <td>{forecast.department_ID}</td>
                            <td>{forecast.department_Name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    const contents = loading
        ? <p><em>Loading...</em></p>
        : renderForecastsTable(forecasts);

    return (
        <div>
            <AdminNavMenu />
            <h1 id="tableLabel">Admin</h1>
            <p>This component demonstrates fetching data from the server.</p>
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {forecasts.map(forecast =>
                        //first letter of field must be NOT caps (even though it is in your class)
                        <tr key={forecast.department_ID}>
                            <td>{forecast.department_ID}</td>
                            <td>{forecast.department_Name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {contents}
        </div>
    
    );
}
