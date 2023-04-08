import React, { useEffect, useState } from 'react'

import {Button, Container, Form, Row, Col, Pagination, Spinner} from 'react-bootstrap';

import alchemy from '../alchemy_server';

import { Utils } from 'alchemy-sdk';

function TxsScreen() {
  const [transactions, setTranasactions] = useState([])
  const [numberT, setNumberT] = useState(10)
  const [page, setPage] = useState("1")
  const [pages, setPages] = useState({1:[]})
  const [loading, setLoading] = useState(false)

  const transformWei = (wei) => {
    wei = parseInt(wei._hex, 16).toString()//wei
    const eth = Utils.formatUnits(wei, "ether"); 
    return eth
  }

  useEffect(() => {
    async function normalizeTransactions(txs){
      const newTxs = []
      //slice txs if more than 100.
      if (txs.length > 100){
        txs = txs.slice(0,100)
      }

      for (let index = 0; index < txs.length; index++) {
        let currentT = txs[index]
        currentT = {...currentT, value:transformWei(currentT.value)}
        newTxs.push(currentT)
      }
      return newTxs
    }

    async function generateTransactions(){
      
      const latestBlock = await alchemy.core.getBlockNumber();
      let response = await alchemy.core.getBlockWithTransactions(latestBlock)
      let txs = response.transactions
      txs = await normalizeTransactions(txs)
      setTranasactions(txs)
    }

    function generatePages(){
      
      let page = 0
      const pagesC = {}
      const txsCopy = [...transactions]
      
      while (true) {
        if (txsCopy.length === 0){
            break
        }
        page += 1
        pagesC[page] = []

        for (let index = 0; index < numberT; index++) {
            if (txsCopy.length === 0){
                break
            }
            const element = txsCopy.shift()
            pagesC[page].push(element)
        }
      }
      setPages(pagesC)
    }

    async function main(){
      setPage(1)
      if(transactions.length === 0){
        await generateTransactions()
      }
      generatePages()
      
    }
    main()

  },[transactions, numberT])

  return (
    <div className='text-center'>
      <h1><i className="fa-solid fa-right-left fs-2 me-2"></i>Transactions</h1>
      <h3>Search for specifics transactions.</h3>

      <Container className='d-flex justify-content-center' fluid>
        <Form className='seach-form'>
          <Form.Control placeholder="Transaction number or hash"/>
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
                      value={numberT} 
                      id="numberT"
                      name='numberT'
                      onChange={(e) => setNumberT(e.target.value)}
                    >
                      <option value="10">10</option>
                      <option value="15">15</option>
                      <option value="20">20</option>
                      <option value="25">25</option>
                    </select>
                    <p className='ms-2'>blocks. </p>
                  </div>
                </Col>
              </Row>

              {pages[page].map( (item, index) => {
                return (
                  <Row key={index}>
                    <Col xs={1} md={1}><i className="fa-solid fa-note-sticky fs-4"></i></Col>
                    <Col  md={1} className="d-none d-md-block">
                      <div><strong>Txn Index.</strong></div>
                      <div>{item.transactionIndex}</div>
                   </Col>
                   <Col xs={7} md={3} >
                      <div><strong>From: </strong>{item.from.slice(0,20)}..</div>
                      <div><strong>To:</strong>{item.to.slice(0,20)}..</div>
                    </Col>
                    <Col  md={2} className="d-none d-md-block">
                      <div><strong>Hash</strong></div>
                      <div>{item.hash.slice(0,20)}..</div>
                    </Col>
                    <Col  md={2} className="d-none d-md-block">
                      <div><strong>Block No.</strong></div>
                      <div>{item.blockNumber}</div>
                    </Col>
                    <Col  md={1} className="d-none d-md-block">
                      <div><strong>Confirmations</strong></div>
                      <div>{item.confirmations}</div>
                    </Col>
                    <Col xs={4} md={2}>
                      <div><strong>Value</strong></div>
                      <div ><span className='gas'>{item.value.slice(0,7)} ETH</span></div>
                    </Col>
                  </Row>
                )})
              }
                
            </Container>
          </Col>
        </Row>
        <Pagination>
          {Object.keys(pages).map((it,idx)=>{
            return(
              <Pagination.Item key={idx} active={parseInt(it) === parseInt(page)} onClick={() => setPage(it)}>
                {it}
              </Pagination.Item> 
            )
           })
          }
        </Pagination>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>


    </div>
  )
}

export default TxsScreen