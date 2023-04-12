import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'

import {  Container, Col, Row, Button, Card } from 'react-bootstrap'
import alchemy from '../alchemy_server';

function BlockSingleScreen() {
  const { id } = useParams()

  const [block, setBlock] = useState({transactions:[]})
  const [errorM, setErorrM] = useState(null)

  const transformGas = (gas) => {
    gas = parseInt(gas._hex, 16).toString()//wei
    gas = gas.slice(0,2) + '.' + gas.slice(2,3)
    return gas
  }

  useEffect(()=>{
    async function getBlocks(){
      setErorrM(false)
      let intOrHash = null

      if(id[1] !== 'x'){
        intOrHash = parseInt(id)
      }else{
        intOrHash = id
      }

      try {
        let response = await alchemy.core.getBlock(intOrHash)

        if(!response){
          throw "Block Null"
        }
        let responseBlock = response
        responseBlock = {...response, gasUsed: transformGas(responseBlock.gasUsed), gasLimit: transformGas(responseBlock.gasLimit) }
        setBlock(responseBlock)
      } catch (error) {
        console.log(error)
        setErorrM("No Block found")
      }
    }

    getBlocks()
  }, [id])

  
  return (
    <div>
      

      {errorM ? (
        // <h1>Sorry we couldn´t find block you requested, {id}</h1>
        <Card className="bg-dark text-white  not-found">
          <Card.Img src="/not-found.jpeg" alt="Card image" className='img-eth'/>
          <Card.ImgOverlay>
            <h1>Sorry, </h1>
            <h1>We couldn´t find block you requested, {id}.</h1>
            <Card.Text className='mt-2'>
              
              <Link to={`/blocks`}><Button variant="light" > Back to blocks <i className="fa-solid fa-house ms-1"></i></Button></Link>   
            </Card.Text>
          </Card.ImgOverlay>
        </Card> 
      ):(
        <div>
          <h1><i className="fa-solid fa-cube "></i> Block <span className='block-num'>#{block.number}</span></h1>
          <hr></hr>
          <h3>Block Overview</h3>
          <Container className=' block-info bg-light' fluid>
            <Row className='block-info-row mb-2'>
              <Col md={2}>
                <p className=''><strong>Hash:</strong></p>
              </Col>
              <Col>
                <p className='block-text'>{block.hash}</p>
              </Col>
            </Row>
            <Row className='block-info-row mb-2'>
              <Col md={2}>
                <p className=''><strong>Parent Hash:</strong></p>
              </Col>
              <Col>
                <p className='block-text'>{block.parentHash}</p>
              </Col>
            </Row>
            <Row className='block-info-row mb-2'>
              <Col md={2}>
                <p className=''><strong>Block No.:</strong></p>
              </Col>
              <Col>
                <p className='block-text'>{block.number}</p>
              </Col>
            </Row>
            <Row className='block-info-row mb-2'>
              <Col md={2}>
                <p className=''><strong>Timestamp:</strong></p>
              </Col>
              <Col>
                <p className='block-text'>{block.timestamp}</p>
              </Col>
            </Row>
            <Row className='block-info-row mb-2'>
              <Col md={2}>
                <p className=''><strong>Gas Limit:</strong></p>
              </Col>
              <Col>
                <p className='block-text'>{block.gasLimit} M</p>
              </Col>
            </Row>
            <Row className='block-info-row mb-2'>
              <Col md={2}>
                <p className=''><strong>Gas Used:</strong></p>
              </Col>
              <Col>
                <p className='block-text'>{block.gasUsed} M</p>
              </Col>
            </Row>
            <Row className='block-info-row '>
              <Col md={2}>
                <p className=''><strong>Transactions:</strong></p>
              </Col>
              <Col>
                <p className='block-text'>Contains {block.transactions.length} txs.</p>
              </Col>
            </Row>
            <Row className='block-info-row '>
              <Col md={2}>
                <p className=''><strong>Miner:</strong></p>
              </Col>
              <Col>
                <p className='block-text'>{block.miner}</p>
              </Col>
            </Row>
          </Container>
          <Container fluid className='d-flex justify-content-between mt-3'>
            <Link to={`/blocks/${block.number + 1}`}><Button variant="outline-primary" > <i className="fa-solid fa-arrow-left me-1"></i> Next Block</Button></Link>
            <Link to={`/blocks/${block.number - 1}`}><Button variant="outline-primary" > Prev Block <i className="fa-solid fa-arrow-right ms-1"></i></Button></Link>
          </Container>
        </div>
      )}
    </div>
  )
}

export default BlockSingleScreen