import React from 'react';
import { Collapse, Navbar, NavbarBrand, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export function ServiceEmployeeNavMenu() {
   

    return (
        <header>
            <Navbar className="navthingy navbar-expand-sm " container light>
                <NavbarBrand tag={Link} to="/">ProjectC</NavbarBrand>

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