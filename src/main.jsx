import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './App.jsx';
import './styles.css';

const root = document.getElementById('root');
const app = <StrictMode><App /></StrictMode>;

// In produzione l'HTML è già generato da scripts/prerender.mjs: React lo idrata.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
