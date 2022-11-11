import crayon from '../../assets/crayon.png'
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';
import { useModal, Modal } from "../../utils/hooks/setModal";
import { StyledIconeModifyPost, StyledModal, StyledFormGroup, StyledTextSpecifiedFormatFile, StyledDivIconeModifyPost }
             from './modifyPostStyle';

function ModifyPost({ data, setData, idPost, idUserPost  }) {

    // [1] state (état, données)
    const { isShowing: isModifyPost, toggle: toggleModifyPost} = useModal();
    // On récupère les données de l'utilisateur connecté, grâce au Context
    const {user, setUser} = useContext(UserContext);
    // On récupère le token dans le localstorage
    const isToken = localStorage.getItem("token");
    // On sélectionne uniquement le post que l'utilisateur souhaite modifier
    const postSelect = data.find((itemSelect) => itemSelect._id === idPost);
    const [isAuthorOrAdmin, setIsAuthorOrAdmin] = useState(true);
    // On récupère les données du post depuis index.jsx du dossier Dashboard pour les afficher dans les input de la Modal
    const [imageHandlePost, setImageHandlePost] = useState(postSelect.imageUrl);
    const [titleHandlePost, setTitleHandlePost] = useState(postSelect.title);
    const [descriptionHandlePost, setDescriptionHandlePost] = useState(postSelect.description);

    // [2] comportements
    function onModify(event) {
        // On empêche le rechargement de la page
        event.preventDefault();
        // On vérifie que l'utilisateur connecté est l'auteur du post ou que l'utilisateur connecté est l'admin
        if(idUserPost === user._id || user.isAdmin === true){
            // On met les nouvelles données dans formData
            const formData = new FormData();
            formData.append("title", titleHandlePost);
            formData.append("description", descriptionHandlePost);
            formData.append("image", imageHandlePost);

            // On indique la méthode d'envoi des données
            // Options de la requête fetch => PUT et Autorisation
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${isToken}`,
                },
                body:  formData
            };

            // Call API pour la connexion
            fetch(`http://localhost:8000/api/posts/${idPost}`, requestOptions)
                .then((response) => {
                    return response.json();
                })
                .then((res) => {
                    // si l'auteur du post ne change pas la photo du post, on met à jour uniquement le titre et la description
                    if (res.postObject.image === imageHandlePost) {
                        // On génère une nouvelle liste de posts en mettant à jour le post qui vient d'être modifié
                        const newPostList = data.map(post => post._id !== idPost ? post: {...post, _id: idPost, title: titleHandlePost, description: descriptionHandlePost});
                        setData(newPostList);

                    } else {
                        // sinon, on met aussi à jour l'image
                        // On génère une nouvelle liste de posts en mettant à jour le post qui vient d'être modifié
                        const newPostList = data.map(post => post._id !== idPost ? post: {...post, _id: idPost, title: titleHandlePost, description: descriptionHandlePost, imageUrl: res.postObject.imageUrl});
                        setData(newPostList);
                    }
                    // On ferme automatiquement la Modal
                    toggleModifyPost();
                })
                .catch((err) => {
                    console.log("Erreur Fetch", err);
                    alert ("Un problème a été rencontré lors de la modification du post.");
                });
            
        } else {
            console.log("Pas admin ou pas auteur du post --> Modification interdite !")
            alert("Vous n'êtes pas autorisé à modifier ce post !");
        }
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
            <StyledDivIconeModifyPost>
                <StyledIconeModifyPost src={crayon} alt="imageModifyPost" title="Modifier" className="modal-toggle" onClick={toggleModifyPost} />
                    <Modal isShowing={isModifyPost} hide={toggleModifyPost} title="Modifier le post">
                        <form onSubmit={onModify} name="postInfo">
                            <StyledFormGroup>
                                <input aria-label="Titre du post" type="text" name="title" onChange={(e) => setTitleHandlePost(e.target.value)} value={titleHandlePost} placeholder="Titre" required/>
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <textarea aria-label="Description du post" name="description" onChange={(e) => setDescriptionHandlePost(e.target.value)} value={descriptionHandlePost} placeholder="Description" required></textarea>
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <img src={postSelect.imageUrl} alt="imagePost" width= "60px" />
                                <StyledTextSpecifiedFormatFile>Choisissez une autre image à télécharger au format autorisé (PNG, JPG ou JPEG)</StyledTextSpecifiedFormatFile>
                                <input aria-label="Image du post" id="fileImagePost" type="file" name="imageUrl" accept=".jpg, .jpeg, .png" onChange={(e) => setImageHandlePost(e.target.files[0], e.target.files[0].name)} />
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <input type="submit" value="Valider" />
                            </StyledFormGroup>
                        </form>
                    </Modal>
                </StyledDivIconeModifyPost>
        )} 
        { isAuthorOrAdmin === false && (
            null
        )}
    </StyledModal>
   )
}
export default ModifyPost;