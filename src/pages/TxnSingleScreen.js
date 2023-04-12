import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

import alchemy from '../alchemy_server';
import { Utils } from 'alchemy-sdk';

import {  Container, Col, Row, Button, Card } from 'react-bootstrap'

function TxnSingleScreen() {
  const { id } = useParams()

  const [transaction, setTransaction] = useState({})
  const [errorM, setErorrM] = useState(null)

  const transformWei = (wei, toUnit) => {
    wei = parseInt(wei._hex, 16).toString()//wei
    const eth = Utils.formatUnits(wei, toUnit); 
    return eth
  }

  useEffect(() => {
    async function getTxn(){
      setErorrM(false)
      try {
        let response = await alchemy.transact.getTransaction(id)
        if(!response){
          throw response
        }
        response = {...response, value:transformWei(response.value, "ether"), gasPrice: transformWei(response.gasPrice, "gwei")}
        setTransaction(response)
      } catch (error) {
        
        console.log(error)
        setErorrM("No Transaction found")
      }
    }

    getTxn()
  }, [])

  
  return (
    <div>
      { errorM ? (
        // <h1>Sorry we couldn´t find block you requested, {id}</h1>
        <Card className="bg-dark text-white  not-found">
          <Card.Img src="/not-found.jpeg" alt="Card image" className='img-eth'/>
          <Card.ImgOverlay>
            <h1>Sorry, </h1>
            <h1>We couldn´t find the transaction you requested, {id}.</h1>
            <Card.Text className='mb-2'>
              <Link to={`/txs`}><Button variant="light" > Back to transactions <i className="fa-solid fa-house ms-1"></i></Button></Link> 
            </Card.Text>
          </Card.ImgOverlay>
        </Card>
      ):(
        <div>
            <h1><i className="fa-solid fa-right-left "></i> Transaction <span className='block-num'>#{transaction.transactionIndex}</span> in block <span className='block-num'>#{transaction.blockNumber}</span></h1>
            <hr></hr>
            <h3>Transaction Details</h3>
            <Container className=' block-info bg-light' fluid>
              <Row className='block-info-row mb-2'>
                <Col md={2}>
                  <p className=''><strong>Hash:</strong></p>
                </Col>
                <Col>
                  <p className='block-text'>{transaction.hash}</p>
                </Col>
              </Row>
              <Row className='block-info-row mb-2'>
                <Col md={2}>
                  <p className=''><strong>From:</strong></p>
                </Col>
                <Col>
                  <p className='block-text'>{transaction.from}</p>
                </Col>
              </Row>
              <Row className='block-info-row mb-2'>
                <Col md={2}>
                  <p className=''><strong>To:</strong></p>
                </Col>
                <Col>
                  <p className='block-text'>{transaction.to}</p>
                </Col>
              </Row>
              <Row className='block-info-row mb-2'>
                <Col md={2}>
                  <p className=''><strong>Block No:</strong></p>
                </Col>
                <Col>
                  <Link to={`/blocks/${transaction.blockNumber}`}>
                    <p className='block-text'>{transaction.blockNumber}</p>
                  </Link>  
                </Col>
              </Row>
              <Row className='block-info-row mb-2'>
                <Col md={3}>
                  <p className=''><strong>Transaction Index:</strong></p>
                </Col>
                <Col>
                  <p className='block-text'>{transaction.transactionIndex}</p>
                </Col>
              </Row>
              <Row className='block-info-row mb-2'>
                <Col md={3}>
                  <p className=''><strong>Confirmations:</strong></p>
                </Col>
                <Col>
                  <p className='block-text'>{transaction.confirmations}</p>
                </Col>
              </Row>
              <Row className='block-info-row mb-2'>
                <Col md={2}>
                  <p className=''><strong>Value:</strong></p>
                </Col>
                <Col>
                  <p className='block-text'>{transaction.value} ETH</p>
                </Col>
              </Row>
              <Row className='block-info-row mb-2'>
                <Col md={2}>
                  <p className=''><strong>Gas Price:</strong></p>
                </Col>
                <Col>
                  <p className='block-text'>{transaction.gasPrice} gwei</p>
                </Col>
              </Row>
              
            </Container>
          </div>
      )}
    </div>
  )
}

export default TxnSingleScreen