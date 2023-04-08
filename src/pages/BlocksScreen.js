import React, { useEffect, useState } from 'react'

import {Button, Container, Form, Row, Col, Pagination} from 'react-bootstrap';

import alchemy from '../alchemy_server';

function BlocksScreen() {
  const [blocks, setBlocks] = useState([])
  const [numberB, setNumberB] = useState(5)
  const [page, setPage] = useState("1")
  const [pages, setPages] = useState({1:[]})

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

    async function generateBlocks(){
      console.log("generating blocks")
      const latestBlock = await alchemy.core.getBlockNumber();
      const localBlocks = []
      
      for (let index = 0; index < 50; index++) {
        const currentBlock = latestBlock - index
        let responeBlock = await getBlocks(currentBlock)

        responeBlock = {...responeBlock, gasUsed: transformGas(responeBlock.gasUsed), gasLimit: transformGas(responeBlock.gasLimit)}
        setBlocks(prevState => [...prevState, responeBlock])
      }
      console.log("Finished generating blocks")
    }

    function generatePages(){
      console.log("generating pages")
      let page = 0
      const pagesC = {}
      const blocksCopy = [...blocks]
      
      while (true) {
        if (blocksCopy.length === 0){
            break
        }
        page += 1
        pagesC[page] = []

        for (let index = 0; index < numberB; index++) {
            if (blocksCopy.length === 0){
                break
            }
            const element = blocksCopy.shift()
            pagesC[page].push(element)
        }
      }
      setPages(pagesC)
    }

    async function main(){
      setPage(1)
      if(blocks.length === 0){
        await generateBlocks()
      }
      generatePages()
      
    }
    
    main()
  }, [numberB, blocks])

  
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

              {pages[page].map( (item, index) => {
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
        
      </Container>
    </div>
  )
}

export default BlocksScreen