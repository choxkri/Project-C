import React  from 'react';
import { Collapse, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from '../images/viscon-logo.png';

export function AdminNavMenu() {
   
    return (
        <header>
            <Navbar className="navthingy navbar-expand-sm " container light>
                <NavbarBrand><img src={logo} alt="Viscon Logo" style={{ width: 58, height: 58 }} /></NavbarBrand>
                
                <Collapse className="navthingy2" navbar>
                    <ul className="navbar-nav">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">NOT IMPLEMENTED</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">NOT IMPLEMENTE</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">NOT IMPLEMENTED</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">NOT IMPLEMENTE</NavLink>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
}
