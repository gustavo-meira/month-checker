import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';

export const RouteIndex = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
  </Routes>
);
