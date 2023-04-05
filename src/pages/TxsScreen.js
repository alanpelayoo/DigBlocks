import React from 'react'

import {Button, Container, Form} from 'react-bootstrap';

function TxsScreen() {
  return (
    <div className='text-center'>
      <h1><i className="fa-solid fa-right-left fs-2 me-2"></i>Transactions</h1>
      <h3>Search for specifics transactions.</h3>

      <Container className='d-flex justify-content-center' fluid>
        <Form className='seach-form'>
          <Form.Control placeholder="Transaction number or hash"/>
          <Button variant="primary ms-3" type="submit" className='d-flex align-items-center'>
            <i class="fa-solid fa-magnifying-glass icon-button me-1"></i> Search
          </Button>
        </Form>
      </Container>
    </div>
  )
}

export default TxsScreen