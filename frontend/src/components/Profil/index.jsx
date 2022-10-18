import {DocumentTitle} from "../../utils/hooks/setDocumentTitle" 
import {useDocumentTitle} from "../../utils/hooks/setDocumentTitle"
//import { TitleH1 } from '../../utils/style/Theme'
import { Container, /*Loader,*/ ConnectionForm, ProfileImageDefaut } from '../../utils/style/Theme'
import React from "react"
import { useState, useEffect } from "react"
import profile from '../../assets/profile.png'
import { Loader } from "../../utils/style/theme/loader"



export default function Profil() {
    useDocumentTitle(`${DocumentTitle.profil}`);
    
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
    useEffect(() => {
        
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
       }, [isToken, isUserId, user.imageUrl]);

    // [3] affichage (render et rerender)
    return (
        <Container>
            <h1>
                Profil
            </h1>
            {loading && <Loader></Loader>}
            {error && (
                <div>{`Nous rencontrons un problème pour récupérer les données des posts et les afficher sur le Tableau de bord - ${error}`}</div>
            )}
            <ConnectionForm>
            { isImageProfil ? (    
                        <div>
                            <ProfileImageDefaut src={user.imageUrl} alt="imageUser" />
                            <div>Prénom : {user.firstname} </div>
                            <div>Nom : {user.lastname}</div>
                            <div>email : {user.email}</div>
                        </div>    
            ) : (
                        <div>
                            <ProfileImageDefaut src={profile} alt="profileImageDefaut" />
                            <div>Prénom : {user.firstname} </div>
                            <div>Nom : {user.lastname}</div>
                            <div>email : {user.email}</div>
                        </div>
            )} 
            </ConnectionForm>  
        </Container>
      );
}