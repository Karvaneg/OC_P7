import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './components/Header';
import Connexion from './pages/Connexion';
import Inscription from './components/Inscription';
import Profil from './components/Profil';
import Dashboard from './pages/Dashboard';
import Error from './components/Error';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StyledGlobalStyle from './utils/style/GlobalStyle';

// on récupère le token du localstorage et on le met dans une variable
const isToken = localStorage.getItem("token");

// On empêche les personnes non connectées d'accéder au tableau de bord et à la page profil
const ProtectedRoutes = ({ children }) => {
  if (!isToken) {
    // si pas de token dans le localstorage, on redirige vers la page connexion
    return <Navigate to="/" replace />;
  }
    // sinon token dans le localstorage, on laisse l'accès à la page demandée
    return children;
};

// On empêche une personne connectée d'accéder à la page connexion et à la page inscription
const ProhibitedRoutes = ({ children }) => {
  if (isToken) {
    // si token dans le localstorage, on redirige vers la page Tableau de bord
    return <Navigate to="/dashboard" replace />;
  }
    // sinon si pas de token dans le localstorage, on laisse l'accès aux pages connexion et inscription
    return children;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
          <StyledGlobalStyle />
          <Header />
          <Routes>
              <Route exact path="/" element={
                <ProhibitedRoutes>
                  <Connexion /> 
                </ProhibitedRoutes>
              }/>
              <Route path="/inscription" element={
                <ProhibitedRoutes>
                  <Inscription />
                </ProhibitedRoutes>  
              } />
              <Route path="/dashboard" element={
                <ProtectedRoutes>
                  <Dashboard />
                </ProtectedRoutes>
              } />
              <Route path="/profil" element={
                <ProtectedRoutes>
                  <Profil />
                </ProtectedRoutes>
              } />
              <Route path="*" element={<Error />} />
          </Routes>
    </Router>
  </React.StrictMode>
);