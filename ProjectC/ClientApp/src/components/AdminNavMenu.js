import React  from 'react';
import { Collapse, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from '../images/viscon-logo.png';

export function AdminNavMenu() {
    const handleLogout = () => {

        localStorage.setItem('user', JSON.stringify(null));

    };

    return (
        <header>
            <Navbar className="navthingy navbar-expand-sm " container light>
                <NavbarBrand><img src={logo} alt="Viscon Logo" style={{ width: 58, height: 58 }} /></NavbarBrand>
                
               
                    <ul className="nav nav-tabs">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/A-MakeAccount">Make Account</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">NOT IMPLEMENTE</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">NOT IMPLEMENTED</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/LogInPage" onClick={handleLogout}>Log Out</NavLink>
                        </NavItem>
                    </ul>
               
            </Navbar>
        </header>
    );
}
