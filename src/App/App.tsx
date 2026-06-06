import { Kernel } from '@GustavOS';
import { Portfolio } from '@portfolio';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/portfolio" element={<Portfolio.FullVersionPortfolio />} />
      <Route path="/gustavos" element={<Kernel />} />
      <Route path="/" element={<div>Home</div>} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default App;
