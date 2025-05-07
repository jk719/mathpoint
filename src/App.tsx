import './App.css'
import Header from './components/header/Header'
import Whiteboard from './components/whiteboard/Whiteboard'
import { QuestionDemo } from './components/QuestionDemo'

function App() {
  return (
    <div className="app-container">
      <Header />
      <QuestionDemo />
      <Whiteboard />
    </div>
  )
}

export default App
