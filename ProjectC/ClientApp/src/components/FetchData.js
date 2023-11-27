import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavMenu } from './NavMenu';

export function FetchData() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};

        console.log(user?.typeAccountID);
        if (user) {
            if (user.typeAccountID === 3) {
                console.log('adm');
                navigate('/AdminMenu');
            } else if (user.typeAccountID === 1) {
                console.log('emp');
                navigate('/ServiceEmployeeMenu');
            } else if (user.typeAccountID === 2) {
                console.log('ter');
                navigate('/FieldEmployeeMenu');
            } else {
                navigate('/LogInPage');
            }
        } else {
            navigate('/LogInPage');
        }
    }, []);

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div>
            <NavMenu />
            <h1 id="tableLabel">You are NOT supposed to be here!</h1>
            <p>WTF YOU DOING, WHY ARE YOU EVEN HERE, NO PERMSISISIISI ONE</p>
            <img src="https://media.tenor.com/fEgws0QEUxQAAAAC/no-nope.gif" alt="Nope" />

            {/* Button to go back */}
            <button onClick={handleGoBack}>Go Back</button>
        </div>
    );
}
