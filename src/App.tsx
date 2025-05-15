import './App.css'
import Header from './components/header/Header'
import Whiteboard from './components/whiteboard/Whiteboard'
import { QuestionDemo } from './components/QuestionDemo'
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
          Assessment Demo
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
          <QuestionDemo />
        </div>
        <div style={{ display: activeTab === 'whiteboard' ? 'block' : 'none', width: '100%' }}>
          <Whiteboard />
        </div>
      </div>
    </div>
  )
}

export default App
