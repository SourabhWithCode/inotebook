import React from 'react'
import { Routes, Route, } from "react-router-dom";
import About from './compontens/About';
import Home from './compontens/Home';
import Navbar from './compontens/Navbar';


function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App

