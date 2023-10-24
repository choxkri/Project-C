
import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import { Link }  from 'react-router-dom';

export function SeeFAQ() {


    return (
        <div>
            <FieldEmployeeNavMenu />
            <div className="rectanglesmall">
                <h1>Potential Problem 1</h1>
                <p>Explanation problem.</p>
                <p> How to Solve this</p>
                <p>picture for more context</p>
            </div>

            <div className="rectanglesmall" >
                <h1>Potential Problem 2</h1>
                <p>Explanation problem.</p>
                <p> How to Solve this</p>
                <p>picture for more context</p>
            </div>

            <div className="rectanglesmall" >
                <h1>Potential Problem 3</h1>
                <p>Explanation problem.</p>
                <p> How to Solve this</p>
                <p>picture for more context</p>
            </div>

            <p>Still not working?? Make a ticket!</p>
            <div className="somebutton">
                <Link to="/F-MakeTicket">Make Ticket</Link>
            </div>
            <div className="somebutton">
                <Link to="/FieldEmployeeMenu">Go Back</Link>
            </div>
        </div>
    );
}
