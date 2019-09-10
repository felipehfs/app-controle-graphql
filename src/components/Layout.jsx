import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const Layout =  props => (
    <>
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => props.history.push("/")}>Controle</Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Link>Sair</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        {props.children}
    </>
)

export default withRouter(Layout);