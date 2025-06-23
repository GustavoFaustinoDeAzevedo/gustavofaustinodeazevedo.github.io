import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import './styles/index.css';
import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(document.getElementById('root'));

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      style={{
        backgroundColor: 'black',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
      }}
      role="alert"
    >
      <h2 style={{ color: 'white', fontSize: '3rem' }}>Algo deu errado</h2>
      <pre style={{ color: 'white', fontSize: '1.5rem' }}>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        style={{ padding: '5px 10px', borderRadius: '10px' }}
      >
        Tentar novamente
      </button>
    </div>
  );
}

root.render(
  <React.StrictMode>
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Provider store={store}>
        <App />
    </Provider>
  </ErrorBoundary>
  </React.StrictMode>
);
