import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CreateUser } from '../pages/CreateUser';
import { HomePage } from '../pages/HomePage';

export const RouteIndex = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/create-user" element={<CreateUser />} />
  </Routes>
);
