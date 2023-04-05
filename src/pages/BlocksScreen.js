import React, { useEffect, useState } from 'react'

import { Utils } from 'alchemy-sdk';
import {Button, Container, Form, Row, Col, Pagination} from 'react-bootstrap';
import { Link } from 'react-router-dom'

import alchemy from '../alchemy_server';

const items = [1,2,3]

function BlocksScreen() {
  const [blocks, setBlocks] = useState([])
  const [numberB, setNumberB] = useState(5)

  const transformGas = (gas) => {
    gas = parseInt(gas._hex, 16).toString()//wei
    gas = gas.slice(0,2) + '.' + gas.slice(2,3)
    return gas
  }

  useEffect(() =>{
    
    async function getBlocks(blockN){
      let response = await alchemy.core.getBlock(blockN)
      return response
    }

    async function main(){
      const latestBlock = await alchemy.core.getBlockNumber();

      for (let index = 0; index < numberB; index++) {
        const currentBlock = latestBlock - index
        let responeBlock = await getBlocks(currentBlock)

        responeBlock = {...responeBlock, gasUsed: transformGas(responeBlock.gasUsed), gasLimit: transformGas(responeBlock.gasLimit)}
        setBlocks(prevState => [...prevState, responeBlock])
      }
    }
    setBlocks([])
    main()
  }, [numberB])

  return (
    <div className='text-center'>
      <h1> <i className="fa-solid fa-cube fs-2 me-2"></i>Blocks</h1>
      <h3>Search for specifics block.</h3>

      <Container className='d-flex justify-content-center' fluid>
        <Form className='seach-form'>
          <Form.Control placeholder="Block number or hash"/>
          <Button variant="primary ms-3" type="submit" className='d-flex align-items-center'>
            <i className="fa-solid fa-magnifying-glass icon-button me-1"></i> Search
          </Button>
        </Form>
      </Container>

      <Container fluid className='mt-5'>
        <Row>
          <Col className='bg-light me-md-3 table' >
            <Container fluid>

              <Row>
                <Col className='table-title'>
                  <div className='select-div'>
                    <p className='me-2'>Display last </p>
                    <select 
                      value={numberB} 
                      id="numberB"
                      name='numberB'
                      onChange={(e) => setNumberB(e.target.value)}
                    >
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                    </select>
                    <p className='ms-2'>blocks. </p>
                  </div>
                </Col>
              </Row>

              {blocks.map( (item, index) => {
              return (
                <Row key={index}>
                  <Col xs={1} md={1}><i className="fa-solid fa-cube fs-4"></i></Col>
                  <Col xs={3} md={1}>
                      <div><strong>Block No.</strong></div>
                      <div>{item.number}</div>
                  </Col>
                  <Col xs={6} md={3} >
                      <div><strong>Txs No. and Timestamp</strong></div>
                      Contains {item.transactions.length} txs, created at {item.timestamp}
                  </Col>
                  <Col  md={2} className="d-none d-md-block">
                      <div><strong>Hash</strong></div>
                      <div>{item.hash.slice(0,20)}..</div>
                  </Col>
                  <Col  md={2} className="d-none d-md-block">
                      <div><strong>Miner</strong></div>
                      <div>{item.miner.slice(0,20)}..</div>
                  </Col>
                  
                  <Col xs={2} md={2}>
                      <div><strong>Total Gas Used</strong></div>
                      <div ><span className='gas'>{item.gasUsed} M</span></div>
                  </Col>
                  <Col  md={1} className="d-none d-md-block">
                      <div><strong>Gas Limit</strong></div>
                      <div ><span className='gas'>{item.gasLimit} M</span></div>
                  </Col>
                </Row>
                  )
                })}
                
            </Container>
          </Col>
        </Row>
        
      </Container>
    </div>
  )
}

export default BlocksScreen