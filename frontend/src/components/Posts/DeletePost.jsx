import poubelle from '../../assets/poubelle.png'
import { StyledIconeDeletePost, StyledDivIconeDeletePost, StyledModal, StyledFormGroup } from './deletePostStyle';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';
import { useModal, Modal } from "../../utils/hooks/setModal";

function DeletePost({ data, setData, idPost, idUserPost  }) {

  // [1] state (état, données)
  const { isShowing: isDeletePost, toggle: toggleDeletePost} = useModal();
    // On récupère les données de l'utilisateur connecté, grâce au Context
    const {user, setUser} = useContext(UserContext);
    // On récupère le token dans le localstorage
    const isToken = localStorage.getItem("token");
    const [isAuthorOrAdmin, setIsAuthorOrAdmin] = useState(true);

    // [2] comportements

    // Fonction si l'utilisateur confirme la suppression du post
    function yes() {
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
                  // On ferme automatiquement la Modal qui demande la confirmation de la suppression
                  toggleDeletePost();
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
    // Fonction si l'utilisateur ne confirme pas la suppression du post
    function no(){
      // On ferme tout simplement la Modal
      toggleDeletePost();
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

    // [3] affichage (render et rerender)
    return (
      <StyledModal>
        { isAuthorOrAdmin && (
        <StyledDivIconeDeletePost>
          <StyledIconeDeletePost src={poubelle} onClick={toggleDeletePost} alt="imageDeletePost" title="Supprimer" className="modal-toggle" />
            <Modal isShowing={isDeletePost} hide={toggleDeletePost} title="Confirmer la suppression">
                <StyledFormGroup>
                  Êtes-vous sûr de vouloir supprimer ce post ?
                </StyledFormGroup>
                <StyledFormGroup>
                  <button className="modal-toggle" onClick={yes}>Oui</button>
                  <button className="modal-toggle" onClick={no}>Non</button>           
                </StyledFormGroup>
            </Modal>
        </StyledDivIconeDeletePost>
        )} 
        { isAuthorOrAdmin === false && (
          null
        )}   
      </StyledModal>
    )
}
export default DeletePost;