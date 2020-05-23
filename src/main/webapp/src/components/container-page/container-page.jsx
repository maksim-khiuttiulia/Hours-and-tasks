import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom";
import './container-page.css'
import { Navbar, Collapse, NavItem, NavLink, NavbarToggler, Container, Nav } from 'reactstrap';
import { logout } from '../../services/user-service'

const ContainerPage = (props) => {

    let history = useHistory();

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const { children } = props;


    const onLogout = () => {
        logout();
        history.push("/");
    }

    return (
        <Container className="wrapper mx-auto">
            <Navbar className="navbar-expand-lg navbar-dark bg-danger text-white rounded mb-5">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/tasks">Tasks</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/projects">Projects</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="#" onClick={onLogout}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
            {children}
        </Container>
    );
}

export default ContainerPage