import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const navbarStyle = {
    backgroundColor: 'lightpink'
};

const Header = ({ title }) => {
    return (
        <Navbar style={navbarStyle} variant="light">
            <Container>
                <Navbar.Brand href="/">{title}</Navbar.Brand>
            </Container>
        </Navbar>
    )
};

export default Header;