import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

function createRootElement() {
  // Check if the element with the id "saibotlive-scroll-tracker" already exists
  let rootElement = document.getElementById('saibotlive-scroll-tracker');

  if (!rootElement) {
    // If it doesn't exist, create a new div element with the required structure
    rootElement = document.createElement('div');
    rootElement.id = 'saibotlive-scroll-tracker';
    document.body.appendChild(rootElement);
  }

  return rootElement;
}

const root = ReactDOM.createRoot(createRootElement());
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
