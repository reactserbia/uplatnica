import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Favicon from 'react-favicon'
import animatedIcon from '@config/icon.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Favicon animated={true} url={animatedIcon} />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
)
