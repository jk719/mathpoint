import './App.css'
import { AuthProvider } from './context/AuthContext'
import Header from './components/header/Header'
import Whiteboard from './components/whiteboard/Whiteboard'
import { Grade2NYQuestions } from './components/Grade2NYQuestions'
import { useState } from 'react'
import { useAuth } from './context/AuthContext'

function MainApp() {
  const [activeTab, setActiveTab] = useState<'assessment' | 'whiteboard'>('assessment');
  const { isAuthenticated } = useAuth();

  return (
    <div className="app-container">
      <Header />
      
      {isAuthenticated ? (
        <>
          <div className="app-tabs">
            <button 
              className={`tab-button ${activeTab === 'assessment' ? 'active' : ''}`} 
              onClick={() => setActiveTab('assessment')}
            >
              🧮 Math Assessment
            </button>
            <button 
              className={`tab-button ${activeTab === 'whiteboard' ? 'active' : ''}`} 
              onClick={() => setActiveTab('whiteboard')}
            >
              🎨 Whiteboard
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
        </>
      ) : (
        <div className="welcome-message">
          <h1>Welcome to MathPoint</h1>
          <h2>Where Math Meets Mastery</h2>
          <p>Master mathematics from elementary through high school with our comprehensive assessment platform and interactive learning tools designed for grades 2-12.</p>
          <div className="features">
            <div className="feature">
              <span className="feature-icon">🧮</span>
              <h3>Adaptive Math Assessments</h3>
              <p>Comprehensive math evaluations covering all grade levels (2-12) with real-time feedback, progress tracking, and personalized learning paths.</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <h3>Smart Progress Analytics</h3>
              <p>Advanced streak tracking, achievement systems, and detailed performance insights to motivate and guide mathematical growth.</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🎨</span>
              <h3>Interactive Whiteboard</h3>
              <p>Collaborative digital workspace perfect for visual problem-solving, mathematical exploration, and creative learning experiences.</p>
            </div>
            <div className="feature">
              <span className="feature-icon">🚀</span>
              <h3>Modern Learning Experience</h3>
              <p>Sleek, responsive design with gamified elements, instant feedback, and engaging animations that make math fun and accessible.</p>
            </div>
          </div>
          <p className="login-prompt">🔐 Please log in using the form above to start your mathematical journey.</p>
        </div>
      )}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  )
}

export default App