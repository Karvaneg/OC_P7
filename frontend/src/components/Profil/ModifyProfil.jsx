import crayon from '../../assets/crayon.png'
import React, { useContext, useState } from 'react';
import { UserContext, } from '../../utils/context/DataUserConnectedContext';
import { useModal, Modal } from "../../utils/hooks/setModal";
import { StyledIconeModifyProfil, StyledModal, StyledFormGroup, StyledTextSpecifiedFormatFile, StyledDivIconeModifyProfil }
             from './modifyProfilStyle';

function ModifyProfil({ userProfil, setUserProfil }) {
    const { isShowing: isModifyProfil, toggle: toggleModifyProfil} = useModal();
    const {user, setUser} = useContext(UserContext);
    const isToken = localStorage.getItem("token");
    // const userImageProfil = userProfil.imageUrl;
    // const userFirstnameProfil = userProfil.firstname;
    // const userLastnameProfil = userProfil.lastname;
    // const userEmailProfil = userProfil.email;
 //   console.log("Image :" + userImageProfil + " Prénom :" + userFirstnameProfil + " Nom :" + userLastnameProfil + " Email :" + userEmailProfil);
    const [imageHandleProfil, setImageHandleProfil] = useState(userProfil.imageUrl);
    const [firstnameHandleProfil, setFirstnameHandleProfil] = useState(userProfil.firstname);
    const [lastnameHandleProfil, setLastnameHandleProfil] = useState(userProfil.lastname);
    const [emailHandleProfil, setEmailHandleProfil] = useState(userProfil.email);
    console.log("Image :" + imageHandleProfil + " Prénom :" + firstnameHandleProfil + " Nom :" + lastnameHandleProfil + " Email :" + emailHandleProfil);
    
    function onModify(event) {
        event.preventDefault();
        // On vérifie que l'utilisateur connecté est l'auteur du post ou que l'utilisateur connecté est l'admin
        if(userProfil._id === user._id || user.isAdmin === true){
            const formData = new FormData();
            formData.append("firstname", firstnameHandleProfil);
            formData.append("lastname", lastnameHandleProfil);
            formData.append("image", imageHandleProfil);
            formData.append("email", emailHandleProfil);
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
            fetch(`http://localhost:8000/api/profils/${user._id}`, requestOptions)
                .then((response) => {
                    return response.json();
                })
                .then((res) => {
                    console.log(res.profilObject);
                   // console.log(res.profilObject.image);
                    console.log(imageHandleProfil);
                    console.log(user.imageUrl);
                    console.log(userProfil.imageUrl);
                    console.log(res.profilObject.image);
                    console.log(res.profilObject.imageUrl);
                    // si l'auteur du post ne change pas la photo du post, on met à jour uniquement prénom, nom et email
                    if (imageHandleProfil === res.profilObject.image) {
                        const profilModify = {
                            email: emailHandleProfil,
                            firstname: firstnameHandleProfil,
                            lastname: lastnameHandleProfil,
                            _id: user._id,
                            isAdmin: user.isAdmin,
                            imageUrl: imageHandleProfil
                        };
                        console.log(profilModify);
                        setUser(profilModify);
                    } else {
                        // sinon, on met aussi à jour l'image
                        const profilModify = {
                            email: emailHandleProfil,
                            firstname: firstnameHandleProfil,
                            lastname: lastnameHandleProfil,
                            imageUrl: res.profilObject.imageUrl,
                            _id: user._id,
                            isAdmin: user.isAdmin
                        };
                        console.log(profilModify);
                        setUser(profilModify);
                    }
                    alert("Le profil a bien été modifié !");
                    toggleModifyProfil();
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


   return (
    <StyledModal>
            <StyledDivIconeModifyProfil>
                <StyledIconeModifyProfil src={crayon} alt="imageModifyProfil" title="Modifier" className="modal-toggle" onClick={toggleModifyProfil} />
                    <Modal isShowing={isModifyProfil} hide={toggleModifyProfil} title="Modifier le profil">
                        <form onSubmit={onModify} name="profilInfo">
                            <StyledFormGroup>
                                <input type="text" name="firstName" onChange={(e) => setFirstnameHandleProfil(e.target.value)} value={firstnameHandleProfil} placeholder="Prénom" required/>
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <input type="text" name="lastname" onChange={(e) => setLastnameHandleProfil(e.target.value)} value={lastnameHandleProfil} placeholder="Nom" required></input>
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <input type="text" name="email" onChange={(e) => setEmailHandleProfil(e.target.value)} value={emailHandleProfil} placeholder="Email" required></input>
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <img src={userProfil.imageUrl} alt="imageProfil" width= "60px" />
                                <StyledTextSpecifiedFormatFile>Choisissez une autre image à télécharger au format autorisé (PNG, JPG ou JPEG)</StyledTextSpecifiedFormatFile>
                                <input id="fileImageProfil" type="file" name="imageUrl" accept=".jpg, .jpeg, .png" onChange={(e) => setImageHandleProfil(e.target.files[0], e.target.files[0].name)} />
                            </StyledFormGroup>
                            <StyledFormGroup>
                                <input type="submit" value="Valider" />
                            </StyledFormGroup>
                        </form>
                    </Modal>
                </StyledDivIconeModifyProfil>
    </StyledModal>
   )
}
export default ModifyProfil;