import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss';

import { Login } from './login/Login';
import { AuthStorage } from './auth/AuthService';
import { Dashboard } from './dashboard/Dashboard';
import { Root } from './login/Root';

function App() {
  return (
    <>
      <AuthStorage>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Root />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </BrowserRouter>
      </AuthStorage>
    </>
  );
}

export default App;
