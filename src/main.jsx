import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Favicon from "react-favicon";
import animatedIcon from "./icon.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Favicon animated={true} url={animatedIcon} />
        <App />
    </React.StrictMode>
)
