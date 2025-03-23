import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Import the Provider from react-redux
import { store } from './store/store'; // Import  Redux store
import App from './App'; 
import './App.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}> {/* Wrap your App in Provider */}
      <App />
    </Provider>
  </StrictMode>
);
