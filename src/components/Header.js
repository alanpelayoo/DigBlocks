import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <Navbar bg="primary" variant="dark">
        <Container >
          <LinkContainer to=''>
            <Navbar.Brand className='d-flex'>
              <img
                alt=""
                src="/logos/white.png"
                width="90"
                height="auto"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
          </LinkContainer> 
          
          <Navbar.Collapse id="basic-navbar-nav" className='links'>
            <Nav className="me-auto d-none d-md-flex">
              <LinkContainer to=''> 
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/blocks'> 
                <Nav.Link>Blocks</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/txs'> 
                <Nav.Link>Transactions</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Header