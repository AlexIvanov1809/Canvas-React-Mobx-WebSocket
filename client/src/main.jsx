import React from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, SettingBar, Toolbar } from './components';
import './styles/style.scss';

const App = () => {
  return (
    <div className='app'>
      <Toolbar />
      <SettingBar />
      <Canvas />
    </div>
  );
};

createRoot(document.getElementById('app')).render(<App />);
