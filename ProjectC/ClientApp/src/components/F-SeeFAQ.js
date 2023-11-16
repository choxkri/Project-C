import { FieldEmployeeNavMenu } from './FieldEmployeeNavMenu';
import { Link } from 'react-router-dom';

export function SeeFAQ() {
    return (
        <div>
            <FieldEmployeeNavMenu />

            <div className="container">
                <div className="rectanglesmall">
                    <h1>Potential Problem 1</h1>
                    <p>Explanation of the problem.</p>
                    <p>How to solve this.</p>
                    <p>Picture for more context.</p>
                </div>

                <div className="rectanglesmall">
                    <h1>Potential Problem 2</h1>
                    <p>Explanation of the problem.</p>
                    <p>How to solve this.</p>
                    <p>Picture for more context.</p>
                </div>

                <div className="rectanglesmall">
                    <h1>Potential Problem 3</h1>
                    <p>Explanation of the problem.</p>
                    <p>How to solve this.</p>
                    <p>Picture for more context.</p>
                </div>

                <p className="text-center">Still not working? Make a ticket!</p>

                <div className="d-flex flex-column align-items-center">
                    <div className="mb-3">
                        <Link to="/F-MakeTicket" className="btn btn-primary">Make Ticket</Link>
                    </div>
                    <div className="mb-3">
                        <Link to="/FieldEmployeeMenu" className="btn btn-secondary">Go Back</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
