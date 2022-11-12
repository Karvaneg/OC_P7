import poubelle from '../../assets/poubelle.png'
import { StyledModal, StyledFormGroup, StyledIconeDeleteProfil, StyledDivIconeDeleteProfil } from './deleteProfilStyle';
import React, { useContext } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';
import { useModal, Modal } from "../../utils/hooks/setModal";

function DeleteProfil({ userProfil }) {

    // [1] state (état, données)
    const { isShowing: isDeleteProfil, toggle: toggleDeleteProfil} = useModal();
    // On récupère les données de l'utilisateur connecté, grâce au Context
    const { user, setUser } = useContext(UserContext);
    // On récupère le token dans le localstorage
    const isToken = localStorage.getItem("token");
   
    // [2] comportements
    // Fonction si l'utilisateur confirme la suppression du profil
    function yes() {
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

    // Fonction si l'utilisateur ne confirme pas la suppression du profil
    function no(){
        // On ferme tout simplement la Modal
        toggleDeleteProfil();
      }


    // [3] affichage (render et rerender)
    return (
        <StyledModal>
            <StyledDivIconeDeleteProfil>
                <StyledIconeDeleteProfil src={poubelle} onClick={toggleDeleteProfil} alt="imageDeleteProfil" title="Supprimer" className="modal-toggle" />
                    <Modal isShowing={isDeleteProfil} hide={toggleDeleteProfil} title="Confirmer la suppression">
                        <StyledFormGroup>
                            Êtes-vous sûr de vouloir supprimer ce profil ?
                        </StyledFormGroup>
                        <StyledFormGroup>
                            <button className="modal-toggle" onClick={yes}>Oui</button>
                            <button className="modal-toggle" onClick={no}>Non</button>           
                        </StyledFormGroup>
                    </Modal>
            </StyledDivIconeDeleteProfil>
        </StyledModal>
    )
}
export default DeleteProfil;