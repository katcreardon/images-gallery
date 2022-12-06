import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);

// Strict Mode causes a "double render" of UseEffects; not sure what benefits are,
// so commenting out for now
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

root.render(<App />);
