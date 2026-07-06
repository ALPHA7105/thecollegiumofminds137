import {StrictMode} from 'react';
// @ts-ignore: react-dom/client has no bundled type declarations in this project
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
// @ts-ignore: no type declarations for side-effect css import
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
