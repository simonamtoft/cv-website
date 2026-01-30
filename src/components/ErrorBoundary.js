import React from 'react';

/**
 * ErrorBoundary component to catch and handle React component errors
 * Displays a fallback UI when an error occurs
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#f4f4f4'
        }}>
          <h1 style={{ color: '#333', fontSize: '2rem', marginBottom: '1rem' }}>
            Oops! Something went wrong
          </h1>
          <p style={{ color: '#555', fontSize: '1.2rem', marginBottom: '2rem' }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              backgroundColor: '#ea850b',
              color: '#fff',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#d67609'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ea850b'}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
