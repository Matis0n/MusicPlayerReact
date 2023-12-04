import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AudioProvider from "./Context/AudioContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AudioProvider>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </AudioProvider>
);

