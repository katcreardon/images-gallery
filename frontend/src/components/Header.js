import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: 'lightpink',
};

const logoStyle = {
  maxWidth: '12rem',
  maxHeight: '2rem',
};

const Header = ({ title }) => {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo alt={title} style={logoStyle} />
      </Container>
    </Navbar>
  );
};

export default Header;
