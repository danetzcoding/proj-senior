import React from 'react'
import Navbar from './components/Navbar/Navbar'
// import { Route, Routes } from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'
import Calendar from './pages/Calendar/Calendar'
import SubmitQuestion from './pages/SubmitQuestion/SubmitQuestion'

const App = () => {
  
  return (
    
      <div className='app'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          
          <Route path='/calendar' element={<Calendar/>} />
          <Route path='/question' element={<SubmitQuestion/>} />
        </Routes>
      </div>
    
  )
}

export default App
