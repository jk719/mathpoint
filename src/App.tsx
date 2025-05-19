import './App.css'
import Header from './components/header/Header'
import Whiteboard from './components/whiteboard/Whiteboard'
import { Grade2NYQuestions } from './components/Grade2NYQuestions'
import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState<'assessment' | 'whiteboard'>('assessment');

  return (
    <div className="app-container">
      <Header />
      
      <div className="app-tabs">
        <button 
          className={`tab-button ${activeTab === 'assessment' ? 'active' : ''}`} 
          onClick={() => setActiveTab('assessment')}
        >
          Grade 2 NY Math
        </button>
        <button 
          className={`tab-button ${activeTab === 'whiteboard' ? 'active' : ''}`} 
          onClick={() => setActiveTab('whiteboard')}
        >
          Whiteboard
        </button>
      </div>
      
      <div className="app-content">
        <div style={{ display: activeTab === 'assessment' ? 'block' : 'none', width: '100%' }}>
          <Grade2NYQuestions />
        </div>
        <div style={{ display: activeTab === 'whiteboard' ? 'block' : 'none', width: '100%' }}>
          <Whiteboard />
        </div>
      </div>
    </div>
  )
}

export default App
