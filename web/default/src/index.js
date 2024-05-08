```js
// Import necessary libraries and components
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import { UserProvider } from './context/User';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StatusProvider } from './context/Status';

// Create React root element and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    // Provide status context
    <StatusProvider>
      // Provide user context
      <UserProvider>
        // Initialize BrowserRouter for routing
        <BrowserRouter>
          // Display Header component
          <Header />
          // Main content wrapped in a Container component
          <Container className={'main-content'}>
            <App />
          </Container>
          // Display ToastContainer for notifications
          <ToastContainer />
          // Display Footer component
          <Footer />
        </BrowserRouter>
      </UserProvider>
    </StatusProvider>
  </React.StrictMode>
);
```