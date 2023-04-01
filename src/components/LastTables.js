import React from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react';


import alchemy from '../alchemy_server';

function LastTables(props) {
    const [blocks, setBlocks] = useState([])

    const transformGas = (gas) => {
        gas = parseInt(gas._hex, 16).toString()//wei
        gas = gas.slice(0,2) + '.' + gas.slice(2,3)
        return gas
    }

    useEffect(()=> {
        async function getBlocks(blockN){
            let response = await alchemy.core.getBlock(blockN)
            return response
        }

        async function generateBlocks(){
            if(props.blockNumber){
                for (let index = 0; index < 5; index++) {
                    const currentBlock = props.blockNumber - index
                    let responeBlock = await getBlocks(currentBlock)
                    responeBlock = {...responeBlock, gasUsed: transformGas(responeBlock.gasUsed)}
                    setBlocks(prevState => [...prevState, responeBlock])
                }
                
            }
        }
    
        generateBlocks()        
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

                        {blocks.map( (item, index) => {
                            return (
                            <Row key={index}>
                                <Col xs={1}><i className="fa-solid fa-cube fs-4"></i></Col>
                                <Col xs={3}>
                                    <div><strong>Block No.</strong></div>
                                    <div>{item.number}</div>
                                </Col>
                                <Col xs={6}>
                                    <div><strong>Txs No. and Timestamp</strong></div>
                                    Contains {item.transactions.length} txs, created at {item.timestamp}
                                </Col>
                                <Col xs={2}>
                                    <div><strong>Total Gas Used</strong></div>
                                    <div ><span className='gas'>{item.gasUsed} M</span></div>
                                </Col>
                            </Row>
                            )
                        })}
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
