import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import animatedIcon from './config/icon'
import Favicon from 'react-favicon'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Favicon animated={true} url={animatedIcon} />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
