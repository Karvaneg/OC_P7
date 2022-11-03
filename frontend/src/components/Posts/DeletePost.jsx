import poubelle from '../../assets/poubelle.png'
import { StyledIconeDeletePost, StyledDivIconeDeletePost } from './deletePostStyle';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

function DeletePost({ data, setData, idPost, idUserPost  }) {
    const user = useContext(UserContext);
    const isToken = localStorage.getItem("token");
    const [isAuthorOrAdmin, setIsAuthorOrAdmin] = useState(true);

    function onDelete() {
        // On demande la confirmation de la suppression du profil
        confirmAlert({
          title: "Confirmer la suppression",
          message: "Êtes-vous sûr de vouloir supprimer ce post ?",
          buttons: [
            {
              label: "Oui",
                onClick: () => {
                  // On vérifie que l'utilisateur connecté est l'auteur du post ou que l'utilisateur connecté est l'admin
                  if(idUserPost === user._id || user.isAdmin === true){

                    // Options de la requête fetch => DELETE et Autorisation
                    const requestOptions = {
                      method: 'DELETE',
                      headers: { 'Authorization': `Bearer ${isToken}` }
                    };
                    fetch(`http://localhost:8000/api/posts/${idPost}`, requestOptions)
                      .then((response) => {
                        // On met à jour le DOM en ne gardant que les posts dont l'id est différent de celui sélectionné pour la suppression
                        const recherche = data.filter((item) => item._id !== idPost);
                        setData(recherche);
                        alert ("Le post a bien été supprimé.");
                      })
                      .catch((err) => {
                        console.log("Erreur Fetch", err);
                        alert ("Un problème a été rencontré lors de la suppression du post.");
                      });
                  } else {
                    console.log("Pas admin ou pas auteur du post --> Suppression interdite !")
                    alert("Vous n'êtes pas autorisé à supprimer ce post !");
                  }
                }
            },
            {
              label: "Non",
    
            }
          ]
        });
    }
    // on regarde si l'utilisateur connecté est l'auteur du post ou s'il est l'admin...
    useEffect(() => {
      // ...pour afficher les icônes "modifier" et "supprimer" au niveau des posts
      if(idUserPost === user._id || user.isAdmin === true){
          setIsAuthorOrAdmin(true);
      // ... ou ne pas les afficher    
      } else {
          setIsAuthorOrAdmin(false);  
      };
    }, [idUserPost, user._id, user.isAdmin]);

    return (
      <div>
        { isAuthorOrAdmin && (
        <StyledDivIconeDeletePost>
          <StyledIconeDeletePost src={poubelle} onClick={onDelete} alt="imageDeletePost" title="Supprimer" />
        </StyledDivIconeDeletePost>
        )} 
        { isAuthorOrAdmin === false && (
          null
        )}
      </div>
    )
}
export default DeletePost;