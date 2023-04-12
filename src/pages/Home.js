import React from 'react'

import { Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import {Card} from 'react-bootstrap';



import Generalnfo from '../components/Generalnfo';
import LastTables from '../components/LastTables';

import alchemy from '../alchemy_server';

function Home() {
    const [blockNumber, setBlockNumber] = useState("");
    const [gasPrice, setGasPrice] = useState("");
    const [baseFee, setBaseFee] = useState("");

    const transformWei = (wei) => {
      wei = parseInt(wei._hex, 16).toString()//wei
      const gwei = Utils.formatUnits(wei, "gwei"); 
      return gwei
    }

    useEffect(() => {

      async function getBlockNumber() {
        const latestBlock = await alchemy.core.getBlockNumber();
        setBlockNumber(latestBlock);
        const {gasPrice:latestGas, lastBaseFeePerGas} =  await alchemy.core.getFeeData();
        setGasPrice(transformWei(latestGas));
        setBaseFee(transformWei(lastBaseFeePerGas))
      }
      getBlockNumber();
    },[]);
  
    return (
      <div>
        <h1>Welcome to DigBlocks.</h1>
        <h4 className='description'>The ultimate ethereum blockchain explorer. </h4>

        <Card className="bg-dark text-white mb-5 eth-world">
          <Card.Img src="/eth-portrait.jpeg" alt="Card image" className='img-eth'/>
          <Card.ImgOverlay>
            <Card.Title>Explore The Ethereum World 🌌</Card.Title>
            <Card.Text>
            Unlock the mysteries of the Ethereum blockchain with our explorer - direct access to the network's nodes for unparalleled transparency and insight!
            </Card.Text>
          </Card.ImgOverlay>
        </Card>  
        <Generalnfo blockNumber={blockNumber} gasPrice={gasPrice} baseFee={baseFee}/>
        <LastTables blockNumber={blockNumber}/>  
      </div>
    )
}

export default Home