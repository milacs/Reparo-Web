import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from './login/Login';
import { AuthStorage } from './auth/AuthService';
import { Dashboard } from './dashboard/Dashboard';
import { Root } from './login/Root';
import Toolbar from './toolbar/Toolbar';
import Footer from './footer/Footer';

function App() {
  return (
    <>
      <AuthStorage>
        <Toolbar />
        <div
          id="content-wrapper"
          className="container flex flex-column justify-center flex-wrap max-w-none w-full h-full bg-gray-100 p-4"
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Root />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/dashboard" element={<Dashboard />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
        <Footer />
      </AuthStorage>
    </>
  );
}

export default App;
