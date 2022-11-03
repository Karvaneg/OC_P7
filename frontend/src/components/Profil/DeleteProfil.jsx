import poubelle from '../../assets/poubelle.png'
import { StyledIconeDeleteProfil, StyledDivIconeDeleteProfil } from './deleteProfilStyle';
import React, { useContext } from 'react';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { UserContext } from '../../utils/context/DataUserConnectedContext';

function DeleteProfil({ userProfil }) {
    const user = useContext(UserContext);
    const isToken = localStorage.getItem("token");
    console.log(user._id);
    console.log(userProfil._id);

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
                },
                {
                    label: "Non",
      
                }
            ]
        });
    }

    return (
        <StyledDivIconeDeleteProfil>
          <StyledIconeDeleteProfil src={poubelle} onClick={onDelete} alt="imageDeleteProfil" title="Supprimer" />
        </StyledDivIconeDeleteProfil>
    )
}
export default DeleteProfil;