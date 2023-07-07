import './App.css'
import Signin from './pages/Signin'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signin/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
