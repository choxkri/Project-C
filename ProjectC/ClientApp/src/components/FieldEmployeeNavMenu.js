import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from '../images/viscon-logo.png';
import user from '../images/User.png';

export function FieldEmployeeNavMenu() {
    
    const handleLogout = () => {

        localStorage.setItem('user', JSON.stringify(null));

    };

    return (
        <header>
            <Navbar className="navthingy navbar-expand-sm " container light>
                <NavbarBrand><img src={logo} alt="Viscon Logo" style={{ width: 58, height: 58 }} /></NavbarBrand>

                <Collapse className="navthingy2" navbar>
                    <ul className="navbar-nav">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/FieldEmployeeMenu">Make A Ticket</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/F-MyTickets">My Tickets</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/F-MachineTickets ">Machine's Ticket    </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/LogInPage" onClick={handleLogout}>Log Out</NavLink>
                        </NavItem>
                        {/*<NavItem>*/}
                        {/*    <NavLink tag={Link} className="text-dark" to="/AccountInfo"> <img src={user} alt="Viscon Logo" style={{ width: 38, height: 38 }} /></NavLink>*/}
                        {/*</NavItem>*/}
                      
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
}
