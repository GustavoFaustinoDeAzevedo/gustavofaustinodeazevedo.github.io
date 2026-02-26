import React from 'react';
import './app.styles.css';

interface LoadingScreenProps {
  text?: string;
  icon?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ text, icon = '💿' }) => (
  <div className="loading-screen flex justify-end items-end padding-4 ">
    <div className="bg-dark opacity-75 flex flex-column flex-align-center p-1 border-radius-1 z-modal">
      <p className="animate-spin text-3xl z-tooltip">{icon}</p>
      {text && <span >{text}</span>}
    </div>
  </div>
);

export default LoadingScreen;
