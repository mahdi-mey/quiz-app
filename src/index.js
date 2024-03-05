import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import QuizContext from './contextes/QuizContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QuizContext>
      <App />
    </QuizContext>
  </React.StrictMode>
)