import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { initAudio } from './utils/mockDataGenerator'

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Prepare audio on first human interaction
const handleInteraction = () => {
  initAudio();
  window.removeEventListener('mousedown', handleInteraction);
  window.removeEventListener('keydown', handleInteraction);
  window.removeEventListener('touchstart', handleInteraction);
};

window.addEventListener('mousedown', handleInteraction);
window.addEventListener('keydown', handleInteraction);
window.addEventListener('touchstart', handleInteraction);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
