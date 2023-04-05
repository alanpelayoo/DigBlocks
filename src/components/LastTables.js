import React from 'react'

import { Utils } from 'alchemy-sdk';
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'

import alchemy from '../alchemy_server';

function LastTables(props) {

    const [blocks, setBlocks] = useState([])
    const [transactions, setTransactions] = useState([])

    //Transforms gas used, hex to dec expressed in M.
    const transformGas = (gas) => {
        gas = parseInt(gas._hex, 16).toString()//wei
        gas = gas.slice(0,2) + '.' + gas.slice(2,3)
        return gas
    }

    const transformWei = (wei) => {
        wei = parseInt(wei._hex, 16).toString()//wei
        const eth = Utils.formatUnits(wei, "ether"); 
        return eth
    }

    useEffect(()=> {
        //Gets block information.
        async function getBlocks(blockN){
            let response = await alchemy.core.getBlock(blockN)
            return response
        }

        async function getTransaction(txHash){
            let response = await alchemy.transact.getTransaction(txHash)
            return response
        }

        //Generates last 5 blocks.
        async function generateBlocks(){
            let txsToWork = null
            if(props.blockNumber){
                for (let index = 0; index < 5; index++) {
                    const currentBlock = props.blockNumber - index
                    let responeBlock = await getBlocks(currentBlock)
                    if(index === 0 ){
                        txsToWork = responeBlock.transactions.slice(0,5)
                    }
                    responeBlock = {...responeBlock, gasUsed: transformGas(responeBlock.gasUsed)}
                    setBlocks(prevState => [...prevState, responeBlock])
                }
            }
            return txsToWork
        }

        async function generateTransactions(txs){
            if(txs){
                for (let index = 0; index < 5; index++) {
                    const currentTransaction = txs[index]
                    let responseT = await getTransaction(currentTransaction)
                    responseT = {...responseT, value:transformWei(responseT.value)}
                    setTransactions(prevState => [...prevState, responseT])
                }
            }
        }

        async function main(){
            const transa = await generateBlocks()
            generateTransactions(transa)              
        }

        main()
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
                        <Row>
                            <Col  className=' d-flex justify-content-center'>
                                <Link to={'/blocks'}>
                                    <Button variant="link">Check all blocks <i className="fa-solid fa-arrow-right"></i></Button>{' '}
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col className='bg-light table'>
                    <Container fluid>
                        <Row>
                            <Col className='table-title'>
                                Last Transactions
                            </Col>
                        </Row>
                        {transactions.map((ite,idx) => {
                            return (
                                <Row key={idx}>
                                    <Col xs={1}><i className="fa-solid fa-note-sticky fs-4"></i></Col>
                                    <Col xs={4}>
                                        <div><strong>Txn No.</strong></div>
                                        <div>{ite.hash.slice(0,12)}...</div>
                                    </Col>
                                    <Col xs={5}>
                                        <div><strong>From </strong> {ite.from.slice(0,12)}...</div>
                                        <div><strong>To </strong>{ite.to.slice(0,12)}...</div>
                                    </Col>
                                    <Col xs={2}>
                                        <div><strong>Value</strong></div>
                                        <div ><span className='gas'>{ite.value.slice(0,4)} ETH</span></div>
                                    </Col>
                                        
                                </Row>
                            )
                        })}
                        <Row>
                            <Col className=' d-flex justify-content-center'>
                                <Link to={'/txs'}>
                                    <Button variant="link">Check all txs <i className="fa-solid fa-arrow-right"></i></Button>{' '}
                                </Link>  
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
            
        </Container>
  )
}

export default LastTables
