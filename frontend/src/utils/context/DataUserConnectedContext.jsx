import React, { createContext, useState, useEffect } from "react";

// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  
  // [1] state (état, données)
    // On récupère le token dans le localstorage
    const isToken = localStorage.getItem("token");
    // On récupère le userId de l'utilisateur connecté, dans le localstorage
    const isUserId = localStorage.getItem("userIdConnected");
    // On déclare une nouvelle variable d'état qui contiendra les donnnées récupérées du backend
    const [user, setUser] = useState([]);


  // [2] comportements
  // Call API pour récupérer les données de l'utilisateur connecté
  useEffect(() => {
    const fetchUser = () => {
      fetch(`http://localhost:8000/api/profils/${isUserId}`, { headers: {"Authorization" : `Bearer ${isToken}`} })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          return response.json();
        })
        .then((userData) => {
          setUser(userData);
        })
        .catch((err) => {
          setUser(null);
        })
    };
    // Fonction de nettoyage
    fetchUser();
    // Liste de dépendances
  }, [ isToken, isUserId ]);

  // [3] affichage (render et rerender)
  return (
    // Le Provider donne accès au contexte à ses enfants
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };