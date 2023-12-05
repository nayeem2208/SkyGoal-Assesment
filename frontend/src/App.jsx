import { useState } from 'react'
import './App.css'
import Routers from './Routers'

function App() {

  return (
    <div
      className="h-full min-h-screen "
         style={{
        background:
          "linear-gradient(90deg,rgba(255,255,255,1) 0%, rgba(72,196,237,1) 67%)",
      }}>
      <Routers/>
    </div>
  )
}

export default App
