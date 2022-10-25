import crayon from '../../assets/crayon.png'
import { StyledIconeModifyPost } from '../../pages/Dashboard/dashboardStyle';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';
import { useModal, Modal } from "../../utils/hooks/setModal";
import { StyledModal, StyledFormGroup, StyledTextSpecifiedFormatFile } from '../../pages/Dashboard/dashboardStyle';

function ModifyPost({ data, setData, idPost, idUserPost  }) {
    const { isShowing: isAddPost, toggle: toggleAddPost} = useModal();
    const user = useContext(UserContext);
    const isToken = localStorage.getItem("token");
        console.log(user, user.isAdmin, user._id, idUserPost);
    const postSelect = data.find((itemSelect) => itemSelect._id === idPost);
        console.log(postSelect);
    const [imageHandlePost, setImageHandlePost] = useState(postSelect.imageUrl);
    const [titleHandlePost, setTitleHandlePost] = useState(postSelect.title);
    const [descriptionHandlePost, setDescriptionHandlePost] = useState(postSelect.description);
    

    function onModify() {
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

                .then((response) => response.json(
                    console.log("Réponse statut" + response.status)))
                    alert ("Le post a bien été mis à jour.")

                .catch((err) => {
                    console.log("Erreur Fetch", err);
                    alert ("Un problème a été rencontré lors de la modification du post.");
                });
        } else {
          console.log("Pas admin ou pas auteur du post --> Modification interdite !")
          alert("Vous n'êtes pas autorisé à modifier ce post !");
        }
    }
    return (
    <StyledModal>
       <StyledIconeModifyPost src={crayon} /*onClick={onModify}*/ alt="imageModifyPost" className="modal-toggle" onClick={toggleAddPost} />
        <Modal isShowing={isAddPost} hide={toggleAddPost} title="Modifier le post">
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
                <input id="fileImagePost" type="file" name="imageUrl" accept=".jpg, .jpeg, .png" onChange={(e) => setImageHandlePost(e.target.files[0], e.target.files[0].name)} /*onChange={imageHandlePost}*/ />
              </StyledFormGroup>
              <StyledFormGroup>
                <input type="submit" value="Valider" />
              </StyledFormGroup>
            </form>
        </Modal>
    </StyledModal>
    )
}
export default ModifyPost;