import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <Navbar bg="primary" variant="dark">
        <Container >
          <Navbar.Brand href="#home" className='d-flex'>
            <img
              alt=""
              src="/logos/white.png"
              width="90"
              height="auto"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to=''> 
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/nfts'> 
                <Nav.Link>NFTs</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/blocks'> 
                <Nav.Link>Blocks</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/trans'> 
                <Nav.Link>Transactions</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/addresses'> 
                <Nav.Link>Addresses</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Header