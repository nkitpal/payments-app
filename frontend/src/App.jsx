import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Account from './components/Account'
import TransferFunds from './components/TransferFunds'


function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<Signup/>}/>
          <Route path = "/signup" element = {<Signup/>}/>
          <Route path = "/signin" element = {<Signin/>}/>
          <Route path = "/account" element = {<Account/>}/>
          <Route path = "/transfer" element = {<TransferFunds/>}/>
        </Routes>
      </BrowserRouter>
  )
}

export default App
