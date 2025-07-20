import { Component } from 'react'

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Error caught:', error, info)
  }

  render() {
    return this.state.hasError ? (
      <div className="error-fallback">
        <h2>Something went wrong</h2>
        <button onClick={() => window.location.reload()}>Refresh</button>
      </div>
    ) : (
      this.props.children
    )
  }
}

export default ErrorBoundary