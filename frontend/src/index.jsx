import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import Connexion from './pages/Connexion';
import Inscription from './components/Inscription';
import Dashboard from './pages/Dashboard';
import Error from './components/Error';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StyledGlobalStyle from './utils/style/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
          <StyledGlobalStyle />
          <Header />
          <Routes>
              <Route exact path="/" element={<Connexion />} />
              <Route path="/inscription" element={<Inscription />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Error />} />
          </Routes>
    </Router>
  </React.StrictMode>
);
