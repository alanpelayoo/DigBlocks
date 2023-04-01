import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react';


import alchemy from '../alchemy_server';

function LastTables(props) {
    const [block, setBlock] = useState({transactions:[]})

    useEffect(()=>{
        async function getBlocks(){
            if(props.blockNumber){
                let response = await alchemy.core.getBlock(props.blockNumber)
                //Logging the response to the console
                setBlock(response)
                console.log(response)
            }
        }
        getBlocks();
    }, [props.blockNumber])
    
    return (
        <Container fluid className='mt-5'>
            <Row>
                <Col className='bg-light me-md-3 table' >
                    <Container fluid>
                        <Row>
                            <Col className='table-title'>
                                Ultimate Blocks
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={1}><i className="fa-solid fa-cube fs-4"></i></Col>
                            <Col xs={3}>16914323</Col>
                            <Col xs={6}>Fee Recipient lightspeedbuilder 2</Col>
                            <Col xs={2}>0.02493 Eth</Col>
                        </Row>
                        <Row>
                            <Col xs={1}><i className="fa-solid fa-cube fs-4"></i></Col>
                            <Col xs={3}>{block.number}</Col>
                            <Col xs={6}>{block.transactions.length} txs</Col>
                            <Col xs={2}>0.02493 Eth</Col>
                        </Row>
                    </Container>
                </Col>
                <Col className='bg-light table'>
                    Table 2
                </Col>
            </Row>
        </Container>
  )
}

export default LastTables