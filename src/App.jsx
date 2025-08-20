import { useState } from 'react'
import Navbar from './components/Navbar'
import ProfileViewer from './components/ProfileViewer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <ProfileViewer />
    </div>
  )
}

export default App