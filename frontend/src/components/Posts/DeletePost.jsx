import poubelle from '../../assets/poubelle.png'
import { StyledIconeDeletePost } from '../../pages/Dashboard/dashboardStyle';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';

function DeletePost({ data, setData, idPost, idUserPost  }) {
    const user = useContext(UserContext);
    const isToken = localStorage.getItem("token");
      console.log(user, user.isAdmin, user._id, idUserPost);

    function onDelete() {
        // On vérifie que l'utilisateur connecté est l'auteur du post ou que l'utilisateur connecté est l'admin
        if(idUserPost === user._id || user.isAdmin === true){

            // Options de la requête fetch => DELETE et Autorisation
            const requestOptions = {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${isToken}` }
            };
            fetch(`http://localhost:8000/api/posts/${idPost}`, requestOptions)
                .then((response) => {
                  console.log(response.status);
                  // On met à jour le DOM en ne gardant que les posts dont l'id est différent de celui sélectionné pour la suppression
                  const recherche = data.filter((item) => item._id !== idPost);
                    console.log(recherche);
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
    return <StyledIconeDeletePost src={poubelle} onClick={onDelete} alt="imageDeletePost" />;
}
export default DeletePost;