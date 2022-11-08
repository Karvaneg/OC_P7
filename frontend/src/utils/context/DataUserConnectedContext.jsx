import React, { createContext, useState, useEffect } from "react";

// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  
  // [1] state (état, données)
    
    const isToken = localStorage.getItem("token");
    const isUserId = localStorage.getItem("userIdConnected");
   // const [user, setUser] = useState(isUserId);
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

    fetchUser();
  }, [ isToken, isUserId ]);

  return (
    // Le Provider donne accès au contexte à ses enfants
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};
export { UserContext, UserContextProvider };