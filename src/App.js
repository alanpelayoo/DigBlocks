import React from 'react'
import {Link, Route, Routes} from 'react-router-dom';
import BlocksScreen from './pages/BlocksScreen';
import TxsScreen from './pages/TxsScreen';

import Home from './pages/Home';
import Headers from './components/Header'

import './App.css';

function App() {
  return (
    <>
      <Headers/>
      <main className="">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/blocks' element={<BlocksScreen/>}/>
          <Route path='/txs' element={<TxsScreen/>}/>
        </Routes>
      </main>
      
    </>
  )
}

export default App;
