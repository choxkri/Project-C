import React, { Component } from 'react';
import './LogInPage.css';
import logo1 from '../NewFolder2/viscon-group-logo.png';
import logo2 from '../NewFolder2/viscon-logo.png';

export class LogInPage extends Component
{
    static displayName = LogInPage.name;

    render() {
        return (
            <div>
                <div className="visconlogo">
                    <img src={logo2} alt="Viscon Logo" style={{ width: 387, height: 387 }} />
                </div>
                
                <div className="rectangle">
                   
                    <img src={logo1} alt="Viscon Group Logo" style={{ width: 410, height: 223 }} />
                    <div className="welcome">
                        <p>Welcome to Viscon Platform:</p>
                    </div>

                    <form action="">
                        <div>
                            
                            <input type="text" name="username" id="username" className="textinputbutton"
                                placeholder="Enter your username"/>
                        </div>
                        <div>
                           
                            <input type="text" name="passw" id="passw" className="textinputbutton"
                                placeholder="Enter your password"/>
                        </div>
                        
                        <button type="submit" className="loginbutton" >Login</button>
                       

                    </form>
                </div>
                
              

            </div>
        );
    }
}
