import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Signin/>} />
          <Route path='/signup' element={<Signup/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
