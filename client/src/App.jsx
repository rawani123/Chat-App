import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Chat from './pages/Chat'
import SetAvatart from './components/SetAvatart'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Chat />} />
        <Route path="/set-avatar" element={<SetAvatart />} />
      </Routes>
    </Router>
  )
}

export default App
