import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Generalnfo( props ) {

  return (
    <div id='info'>
        <h2>Last Chain Data</h2>
        <Container  className='info bg-light'>
            <Row>
                <Col className='info1 d-flex justify-content-start align-items-center px-3 py-1' xs={12} md={6}>
                    <div >
                        <i className="fa-solid fa-cube info-icon"></i>
                    </div>
                    <div className='ms-4'>
                        <p className='info-title'>Last Block</p>
                        <p className='fs-5'>{props.blockNumber}</p>
                    </div>
                    
                </Col>
                <Col className='info2 d-flex justify-content-start align-items-center px-3 py-1' xs={12} md={6}>
                    <div >
                        <i className="fa-solid fa-gas-pump info-icon"></i>
                    </div>
                    <div className='ms-4  '>
                        <p className='info-title'>Gas Price</p>
                        <p className='fs-5'>{props.gasPrice} gwei </p>
                    </div>
                    
                </Col>
            </Row>
            <Row>
                <Col className='info3 d-flex justify-content-start align-items-center px-3 py-1' xs={12} md={6}>
                    <div >
                        <i className="fa-brands fa-ethereum info-icon"></i>
                    </div>
                    <div className='ms-4'>
                        <p className='info-title'>Eth Price</p>
                        <p className='fs-5'> $1,760.40 </p>
                    </div>
                    
                </Col>
                <Col className='info4 d-flex justify-content-start align-items-center px-3 py-1' xs={12} md={6}>
                    <div >
                        <i className="fa-solid fa-comments-dollar info-icon"></i>
                    </div>
                    <div className='ms-4  '>
                        <p className='info-title'>Last Base Fee</p>
                        <p className='fs-5'>{props.baseFee} gwei</p>
                    </div>
                    
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Generalnfo