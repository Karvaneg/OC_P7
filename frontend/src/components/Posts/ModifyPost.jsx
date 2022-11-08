import crayon from '../../assets/crayon.png'
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';
import { useModal, Modal } from "../../utils/hooks/setModal";
import { StyledIconeModifyPost, StyledModal, StyledFormGroup, StyledTextSpecifiedFormatFile, StyledDivIconeModifyPost }
             from './modifyPostStyle';

function ModifyPost({ data, setData, idPost, idUserPost  }) {
    const { isShowing: isModifyPost, toggle: toggleModifyPost} = useModal();
    const {user, setUser} = useContext(UserContext);
    const isToken = localStorage.getItem("token");
    const postSelect = data.find((itemSelect) => itemSelect._id === idPost);
    
    const [isAuthorOrAdmin, setIsAuthorOrAdmin] = useState(true);
    const [imageHandlePost, setImageHandlePost] = useState(postSelect.imageUrl);
    const [titleHandlePost, setTitleHandlePost] = useState(postSelect.title);
    const [descriptionHandlePost, setDescriptionHandlePost] = useState(postSelect.description);

    function onModify(event) {
        event.preventDefault();
        // On vérifie que l'utilisateur connecté est l'auteur du post ou que l'utilisateur connecté est l'admin
        if(idUserPost === user._id || user.isAdmin === true){
            const formData = new FormData();
            formData.append("title", titleHandlePost);
            formData.append("description", descriptionHandlePost);
            formData.append("image", imageHandlePost);
            formData.forEach((value, key) => {
                console.log(key + " " + value);
            })

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
                        const postModify = {
                            ...postSelect,
                            _id: idPost,
                            title: titleHandlePost,
                            description: descriptionHandlePost,
                           // imageUrl: imageHandlePost
                        };
                        // on filtre tous les posts sauf le post qui est en train d'être modifié...
                        const recherche = data.filter((item) => item._id !== idPost);
                        // ...et, on ajoute à ces posts filtrés, les mises à jour du post modifié
                       // console.log(postModify);
                        setData([...recherche, postModify]);
        
                    } else {
                        // sinon, on met aussi à jour l'image
                        const postModify = {
                            ...postSelect,
                            _id: idPost,
                            title: titleHandlePost,
                            description: descriptionHandlePost,
                            imageUrl: res.postObject.imageUrl
                        };
                        // on filtre tous les posts sauf le post qui est en train d'être modifié...
                        const recherche = data.filter((item) => item._id !== idPost);
                        // ...et, on ajoute à ces posts filtrés, les mises à jour du post modifié
                      //  console.log(postModify);
                        setData([...recherche, postModify]);
                    
                    }
                    alert("Le post a bien été modifié !")
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


   return (
    <StyledModal>
        { isAuthorOrAdmin && (
            <StyledDivIconeModifyPost>
                <StyledIconeModifyPost src={crayon} alt="imageModifyPost" title="Modifier" className="modal-toggle" onClick={toggleModifyPost} />
                    <Modal isShowing={isModifyPost} hide={toggleModifyPost} title="Modifier le post">
                        <form onSubmit={onModify} name="postInfo">
                            <StyledFormGroup>
                                <input type="text" name="title" onChange={(e) => setTitleHandlePost(e.target.value)} value={titleHandlePost} placeholder="Titre" required/>
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <textarea name="description" onChange={(e) => setDescriptionHandlePost(e.target.value)} value={descriptionHandlePost} placeholder="Description" required></textarea>
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <img src={postSelect.imageUrl} alt="imagePost" width= "60px" />
                                <StyledTextSpecifiedFormatFile>Choisissez une autre image à télécharger au format autorisé (PNG, JPG ou JPEG)</StyledTextSpecifiedFormatFile>
                                <input id="fileImagePost" type="file" name="imageUrl" accept=".jpg, .jpeg, .png" onChange={(e) => setImageHandlePost(e.target.files[0], e.target.files[0].name)} />
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