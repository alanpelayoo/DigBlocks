import React from 'react'
import { Route, Routes} from 'react-router-dom';
import BlocksScreen from './pages/BlocksScreen';
import BlockSingleScreen from './pages/BlockSingleScreen';
import TxsScreen from './pages/TxsScreen';
import TxnSingleScreen from './pages/TxnSingleScreen';

import Home from './pages/Home';
import Headers from './components/Header'
import Footer from './components/Footer';

import './App.css';


function App() {
  return (
    <>
      <Headers/>
      <main className="">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/blocks' element={<BlocksScreen/>}/>
          <Route path='/blocks/:id' element={<BlockSingleScreen/>}/>
          <Route path='/txs' element={<TxsScreen/>}/>
          <Route path='/txs/:id' element={<TxnSingleScreen/>}/>
        </Routes>
      </main>
      <Footer/>
      
    </>
  )
}

export default App;
