import React from 'react'

import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import {Card} from 'react-bootstrap';

import '../App.css';

import Generalnfo from '../components/Generalnfo';
import LastTables from '../components/LastTables';

const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  
const alchemy = new Alchemy(settings);

function Home() {
    const [blockNumber, setBlockNumber] = useState();

    useEffect(() => {
      async function getBlockNumber() {
        const latestBlock = await alchemy.core.getBlockNumber();
        setBlockNumber(latestBlock)
      }
      getBlockNumber();
    },[]);
  
    return (
      <div>
        <main>
          <h1>Welcome to DigBlocks.</h1>
          <h4 className='description'>The ultimate ethereum blockchain explorer.</h4>
  
          <Card className="bg-dark text-white mb-5 eth-world">
            <Card.Img src="/eth-portrait.jpeg" alt="Card image" className='img-eth'/>
            <Card.ImgOverlay>
              <Card.Title>Explore The Ethereum World</Card.Title>
              <Card.Text>
              Unlock the mysteries of the Ethereum blockchain with our explorer - direct access to the network's nodes for unparalleled transparency and insight!
              </Card.Text>
            </Card.ImgOverlay>
          </Card>
  
          <Generalnfo/>
          <LastTables/>
          
        </main>
        
      </div>
    )
}

export default Home