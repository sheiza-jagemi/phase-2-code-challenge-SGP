import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import GoalDashboard from './components/GoalDashboard'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="app-container">
          <ErrorBoundary>
            <Routes>
              <Route index element={<GoalDashboard />} />
              <Route path="dashboard" element={<GoalDashboard />} />
              {/* Add more routes here if needed */}
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App