import React, { createContext, useState, useEffect } from "react";
//import { Loader } from "../style/theme/loader";

// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  
  // [1] state (état, données)
    
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isToken = localStorage.getItem("token");
    const isUserId = localStorage.getItem("userIdConnected");
    const [user, setUser] = useState(isUserId);
   // const [isImageProfil, setIsImageProfil] = useState(false);

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
          
          // if(user.imageUrl === null){
          //   setIsImageProfil(true);
          // } else {
          //   setIsImageProfil(false);
          // }
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    
    fetchUser();
  }, [ isToken, isUserId ]);


  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>

  
  );
};
export { UserContext, UserContextProvider };