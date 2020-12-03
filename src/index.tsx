// Import deps
import React from 'react'
import { render } from 'react-dom'

// Import components
import { MovieDashboard } from './components/main'

// Find div container
const rootElement = document.getElementById('root');

// Render dashboard component in the DOM
render(<MovieDashboard />, rootElement);