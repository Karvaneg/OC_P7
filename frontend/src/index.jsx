import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Connexion from './pages/Connexion';
import Profil from './pages/Profil';
import Dashboard from './pages/Dashboard';
import Error from './components/Error';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StyledGlobalStyle from './utils/style/GlobalStyle';
import { UserContextProvider } from './utils/context/DataUserConnectedContext';

// on récupère le token du localstorage et on le met dans une variable
const isToken = localStorage.getItem("token");
// On récupère la date de connexion de l'utilisateur dans le localstorage et on la met dans une variable
const dateUserConnection = localStorage.getItem("dateConnection");
//On calcule la différence entre la date à l'instant t et la date de connexion de l'utilisateur
const sessionDuration = Date.now() - dateUserConnection;

//Fonction pour pour stopper la session d'un utilisateur si celle-ci est supérieure à 24h
const StopedSession = ({ children }) => {
  //Si la date de connexion n'est pas null et que la différence entre les 2 dates est supérieur à 24h (86400000millisecondes)
  if (dateUserConnection !== null && sessionDuration > 86400000){
    // on vide le localstorage et on recharge la page, pour être automatiquement redirigé vers la page de connexion
    localStorage.clear();
    window.location.reload();
  }
  else {
    return children;
  }
};


// On empêche les personnes non connectées d'accéder au tableau de bord et à la page profil
const ProtectedRoutes = ({ children }) => {
  if (!isToken) {
    // si pas de token dans le localstorage, on redirige vers la page connexion
    return <Navigate to="/" replace />;
  }
    // sinon si token dans le localstorage, on laisse l'accès à la page demandée
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
              <Route path="/dashboard" element={
                <ProtectedRoutes>
                  <StopedSession>
                    <UserContextProvider>
                      <Dashboard />
                    </UserContextProvider>
                  </StopedSession>
                </ProtectedRoutes>
              } />
              <Route path="/profil" element={
                <ProtectedRoutes>
                  <StopedSession>
                    <UserContextProvider>
                      <Profil />
                    </UserContextProvider>
                  </StopedSession>
              </ProtectedRoutes>
              } />
              <Route path="*" element={<Error />} />
          </Routes>
    </Router>
  </React.StrictMode>
);