import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './Home'
import Login from './Login'
import LoginSuccess from './LoginSuccess'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
        <Route exact path='/login-success' element={<LoginSuccess />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
