import poubelle from '../../assets/poubelle.png'
import { StyledIconeDeleteProfil, StyledDivIconeDeleteProfil } from './deleteProfilStyle';
import React, { useContext } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';

function DeleteProfil({ userProfil }) {
    const user = useContext(UserContext);
    const isToken = localStorage.getItem("token");
    console.log(user._id);
    console.log(userProfil._id);

    function onDelete() {
        // On vérifie que l'utilisateur connecté est l'auteur du post ou que l'utilisateur connecté est l'admin
        if(userProfil._id === user._id || user.isAdmin === true){
    /////////// ici ajouter une boite de dialogue demandant la confirmation de la suppression ////////
            // Options de la requête fetch => DELETE et Autorisation
            const requestOptions = {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${isToken}` }
            };
            fetch(`http://localhost:8000/api/profils/${userProfil._id}`, requestOptions)
                .then((response) => {
                    console.log(response.status);
                    alert ("Le profil a bien été supprimé."); 
                        localStorage.clear();
                        document.location.href = `/`;
                })
                .catch((err) => {
                  console.log("Erreur Fetch", err);
                  alert ("Un problème a été rencontré lors de la suppression du profil.");
                });
        } else {
          console.log("Pas admin ou pas propriétaire du profil --> Suppression interdite !")
          alert("Vous n'êtes pas autorisé à supprimer ce profil !");
        }
    }

    return (
        <StyledDivIconeDeleteProfil>
          <StyledIconeDeleteProfil src={poubelle} onClick={onDelete} alt="imageDeleteProfil" />
        </StyledDivIconeDeleteProfil>
    )
}
export default DeleteProfil;