// CombinedNavMenu.js
import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from '../images/viscon-logo.png';

export function CombinedNavMenu({ user }) {
    const handleLogout = () => {
        localStorage.clear();
       // window.location.reload()
    };
    console.log(user);
    return (
        <header>
            <Navbar className="navthingy navbar-expand-sm " container light>
                <NavbarBrand><img src={logo} alt="Viscon Logo" style={{ width: 58, height: 58 }} /></NavbarBrand>

                <Collapse className="navthingy2" navbar>
                    <ul className="navbar-nav">
                        {user.typeAccountID === 3 && (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/A-MakeAccount">Make Account</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/LogInPage" onClick={handleLogout}>Log Out</NavLink>
                                </NavItem>
                            </>
                        )}
                        {user.typeAccountID === 2 && (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/FieldEmployeeMenu">Make A Ticket</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/F-MyTickets">My Tickets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/F-MachineTickets">Machine's Ticket</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/LogInPage" onClick={handleLogout}>Log Out</NavLink>
                                </NavItem>
                            </>
                        )}
                        {user.typeAccountID === 1 && (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/ServiceEmployeeMenu">My Tickets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/S-UnassignedTickets">Unassigned Tickets</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/LogInPage" onClick={handleLogout}>Log Out</NavLink>
                                </NavItem>
                            </>
                        )}
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
}
