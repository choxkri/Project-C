
import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import {Link} from 'react-router-dom';
import './F.css';

export function FieldEmployeeMenu() {

   

    return (
        <div>
            <FieldEmployeeNavMenu />


            <div className="rectanglesmall">
                <h1>Make A ticket</h1>
                <p>Before making a ticket, you will answer a couple of FAQ to see if you can already fix the issue yourself</p>
                
                <div className="somebutton">
                    
                    <Link to="/F-SeeFAQ">See FAQ</Link>
                </div>
                
            </div>
           
        </div>
    );
}
