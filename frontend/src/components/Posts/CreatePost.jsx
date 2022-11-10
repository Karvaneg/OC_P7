import React, { useContext, useState } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';
import { useModal, Modal } from "../../utils/hooks/setModal";
import { StyledModal, StyledFormGroup, StyledTextSpecifiedFormatFile } from './createPostStyle';

function CreatePost({ data, setData }) {
    const { isShowing: isAddPost, toggle: toggleAddPost} = useModal();
    const {user, setUser} = useContext(UserContext);
    const isToken = localStorage.getItem("token");
    const [imageHandlePost, setImageHandlePost] = useState("");
    const [titleHandlePost, setTitleHandlePost] = useState("");
    const [descriptionHandlePost, setDescriptionHandlePost] = useState("");

    function onCreate(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", titleHandlePost);
        formData.append("description", descriptionHandlePost);
        formData.append("image", imageHandlePost);
        formData.append("userId", user._id);
        formData.append("publishedDate", Date.now());
        formData.forEach((value, key) => {
            console.log(key + " " + value);
        })

            // On indique la méthode d'envoi des données
            // Options de la requête fetch => POST et Autorisation
            const dataMethodPost = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${isToken}`,
                },
                body:  formData
            };

            // Call API pour la connexion
            fetch("http://localhost:8000/api/posts", dataMethodPost)
                .then((response) => {
                    return response.json();
                })
                .then((postData) => {
                    setData([...data, postData.post]);
                    alert ("Votre post a bien été créé.");
                    toggleAddPost();
                })
                .catch((err) => {
                    console.log("Erreur Fetch", err);
                    alert ("Un problème a été rencontré lors de l'envoi du formulaire.");
                });
    }
    return (
    <StyledModal>
        <button className="modal-toggle" onClick={toggleAddPost}>Ajouter un post</button>
        <Modal isShowing={isAddPost} hide={toggleAddPost} title="Ajouter un post">
            <form onSubmit={onCreate} name="postInfo">
              <StyledFormGroup>
                <input aria-label="Titre du post" type="text" name="title" onChange={(e) => setTitleHandlePost(e.target.value)} value={titleHandlePost} placeholder="Titre" required/>
              </StyledFormGroup>
              <StyledFormGroup>
                <textarea aria-label="Description du post" name="description" onChange={(e) => setDescriptionHandlePost(e.target.value)} value={descriptionHandlePost} placeholder="Description" required></textarea>
              </StyledFormGroup>
              <StyledFormGroup>
                <StyledTextSpecifiedFormatFile>Choisissez une image à télécharger au format autorisé (PNG, JPG ou JPEG)</StyledTextSpecifiedFormatFile>
                <input aria-label="Image du post" id="fileImagePost" type="file" name="imageUrl" accept=".jpg, .jpeg, .png" onChange={(e) => setImageHandlePost(e.target.files[0], e.target.files[0].name)} required/>
              </StyledFormGroup>
              <StyledFormGroup>
                <input type="submit" value="Valider" />
              </StyledFormGroup>
            </form>
          </Modal>
    </StyledModal>
    )
}
export default CreatePost;