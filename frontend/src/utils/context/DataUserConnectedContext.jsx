import React, { createContext, useState, useEffect } from "react";

// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // the value that will be given to the context
  //const [user, setUser] = useState(null);
  // [1] state (état, données)
    
    //const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const infoUser = JSON.parse(localStorage.getItem("testObject"));
    // const isToken = infoUser.token;
    // console.log(isToken);
    // const userId = infoUser.userId;
    // console.log(userId);
    const isToken = localStorage.getItem("token");
    const isUserId = localStorage.getItem("userIdConnected");
    const [user, setUser] = useState(isUserId);
    const [isImageProfil, setIsImageProfil] = useState(false);

    // [2] comportements

  // fetch a user from a fake backend API
  useEffect(() => {
    const fetchUser = () => {
      // this would usually be your own backend, or localStorage
      // for example
      // fetch("https://randomuser.me/api/")
      //   .then((response) => response.json())
      //   .then((result) => setUser(result.results[0]))
      //   .catch((error) => console.log("An error occured"));
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
          console.log(userData);
          if(user.imageUrl === null){
            setIsImageProfil(true);
          } else {
            setIsImageProfil(false);
          }
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
  }, [isToken, isUserId, user.imageUrl]);

  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };