import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4'>
          <div className='w-full max-w-md bg-white shadow-xl rounded-2xl p-6 border border-red-200'>
            <div className='text-center'>
              <h1 className='text-3xl font-bold text-red-600 mb-4'>Oops! Something went wrong</h1>
              <p className='text-gray-600 mb-4'>
                An unexpected error occurred. Please try refreshing the page or contact support if the problem persists.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className='text-left bg-red-50 p-4 rounded-lg mb-4 border border-red-200'>
                  <summary className='cursor-pointer font-semibold text-red-700 mb-2'>
                    Error Details (Development Only)
                  </summary>
                  <pre className='text-xs overflow-auto text-red-600'>
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <button
                onClick={() => window.location.reload()}
                className='w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition-all duration-300'
              >
                Refresh Page
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className='w-full mt-2 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg font-semibold transition-all duration-300'
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
