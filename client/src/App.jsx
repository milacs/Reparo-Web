import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Login } from './login/Login';
import { AuthStorage } from './auth/AuthService';
import { Dashboard } from './dashboard/Dashboard';
import { Root } from './login/Root';
import Toolbar from './toolbar/Toolbar';
import Footer from './footer/Footer';
import { UploadService } from './upload/UploadService';

function App() {
  return (
    <>
      <AuthStorage>
        <UploadService>
          <Toolbar />
          <div
            id="content-wrapper"
            className="container max-w-none w-full h-[84.5vh] p-4 overflow-hidden"
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
        </UploadService>
      </AuthStorage>
    </>
  );
}

export default App;
