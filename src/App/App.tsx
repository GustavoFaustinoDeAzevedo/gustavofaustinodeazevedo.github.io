import { NotFound, Portfolio, Kernel } from '@/pages';

import React from 'react';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Kernel />} />
      {/* <Route path="/" element={<Portfolio.FullVersionPortfolio />} /> */}
      <Route path="/portfolio" element={<Portfolio.FullVersionPortfolio />} />
      <Route path="/gustavos" element={<Kernel />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
