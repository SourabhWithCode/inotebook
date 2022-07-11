import React from 'react'
import { Routes, Route, } from "react-router-dom";
import About from './compontens/About';
import Home from './compontens/Home';
import Navbar from './compontens/Navbar';
import NoteState from './context/notes/NoteState';


function App() {
  return (
    <>
      <NoteState>
        <div>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </NoteState>
    </>
  )
}

export default App

