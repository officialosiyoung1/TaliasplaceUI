import Home from './Pages/Home'
import Nav from './components/Nav'
import BookMe from './Pages/BookMe'
import Dashboard from './Pages/Dashboard/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <Router>
        <Nav />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book-me" element={<BookMe />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
  )
}

export default App
/* <Route path="/login" element={<Login />} /> */
// import Login from './Pages/Login'
