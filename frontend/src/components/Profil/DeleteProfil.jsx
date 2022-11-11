import poubelle from '../../assets/poubelle.png'
import { StyledIconeDeleteProfil, StyledDivIconeDeleteProfil } from './deleteProfilStyle';
import React, { useContext } from 'react';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { UserContext } from '../../utils/context/DataUserConnectedContext';

function DeleteProfil({ userProfil }) {

    // [1] state (état, données)
    // On récupère les données de l'utilisateur connecté, grâce au Context
    const { user, setUser } = useContext(UserContext);
    // On récupère le token dans le localstorage
    const isToken = localStorage.getItem("token");
   
    // [2] comportements
    function onDelete() {
        // On demande la confirmation de la suppression du profil
        confirmAlert({
            title: "Confirmer la suppression",
            message: "Êtes-vous sûr de vouloir supprimer ce profil ?",
            buttons: [
                {
                    label: "Oui",
                        onClick: () => {
                            // On vérifie que le profil appartient à l'utilisateur connecté ou que l'utilisateur connecté est l'admin
                            if(userProfil._id === user._id || user.isAdmin === true){
        
                                // Options de la requête fetch => DELETE et Autorisation
                                const requestOptions = {
                                    method: 'DELETE',
                                    headers: { 'Authorization': `Bearer ${isToken}` }
                                };

                                fetch(`http://localhost:8000/api/profils/${userProfil._id}`, requestOptions)
                                    .then((response) => { 
                                        // On vide le localstorage et on fait une redirection vers la page de connexion
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
                },
                {
                    label: "Non",
      
                }
            ]
        });
    }
    // [3] affichage (render et rerender)
    return (
        <StyledDivIconeDeleteProfil>
          <StyledIconeDeleteProfil src={poubelle} onClick={onDelete} alt="imageDeleteProfil" title="Supprimer" />
        </StyledDivIconeDeleteProfil>
    )
}
export default DeleteProfil;