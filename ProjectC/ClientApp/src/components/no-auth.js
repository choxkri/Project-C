import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function NoAuth() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};

       
        if (user) {
            if (user.typeAccountID === 3) {
                
                navigate('/A-MakeAccount');
            } else if (user.typeAccountID === 1) {
               
                navigate('/ServiceEmployeeMenu');
            } else if (user.typeAccountID === 2) {
              
                navigate('/FieldEmployeeMenu');
            } else {
                navigate('/LogInPage');
            }
        } else {
            navigate('/LogInPage');
        }
    }, []);

 

    return (
        <div>
            <h1 id="tableLabel">You are NOT supposed to be here!</h1>
          
        </div>
    );
}
