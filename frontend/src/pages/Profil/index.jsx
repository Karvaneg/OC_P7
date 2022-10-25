import {DocumentTitle} from "../../utils/hooks/setDocumentTitle" 
import {useDocumentTitle} from "../../utils/hooks/setDocumentTitle"
//import { TitleH1 } from '../../utils/style/Theme'
//import { Container, /*Loader,*/ ConnectionForm, ProfileImageDefaut } from '../../utils/style/Theme'
import { StyledContainer, ConnectionForm, StyledDivImageProfil, StyledImageProfil, StyledProfilInformation, 
    StyledFirstnameLastname, StyledEmail, StyledDivIconeModifyProfil, StyledIconeModifyProfil, 
    StyledDivIconeDeleteProfil, StyledIconeDeleteProfil, StyledIconesProfil } from "./profilStyle";
import React, { useContext, useState } from 'react';
import profile from '../../assets/profile.png'
import { Loader } from "../../utils/style/theme/loader"
import { UserContext } from "../../utils/context/DataUserConnectedContext";
import crayon from '../../assets/crayon.png'
import poubelle from '../../assets/poubelle.png'


export default function Profil() {
    useDocumentTitle(`${DocumentTitle.profil}`);
    const user = useContext(UserContext);
    

    // [1] state (état, données)

    //const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const infoUser = JSON.parse(localStorage.getItem("testObject"));
    // const isToken = infoUser.token;
    // console.log(isToken);
    // const userId = infoUser.userId;
    // console.log(userId);
    // const isToken = localStorage.getItem("token");
    // const isUserId = localStorage.getItem("userIdConnected");
    // const [user, setUser] = useState(isUserId);
    const [isImageProfil, setIsImageProfil] = useState(false);
    

    
   // console.log("loading2" + loading);
    // [2] comportements
    
    // useEffect(() => {
        
    //     fetch(`http://localhost:8000/api/profils/${isUserId}`, { headers: {"Authorization" : `Bearer ${isToken}`} })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error(
    //           `This is an HTTP error: The status is ${response.status}`
    //         );
    //       }
    //       return response.json();
    //     })
    //     .then((userData) => {
           
    //       setUser(userData);
    //       console.log(userData);
    //       if(user.imageUrl === null){
    //         setIsImageProfil(true);
    //       } else {
    //         setIsImageProfil(false);
    //       }
    //       setError(null);
    //     })
    //     .catch((err) => {
    //       setError(err.message);
    //       setUser(null);
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    //    }, [isToken, isUserId, user.imageUrl]);



    // [3] affichage (render et rerender)
    return (
        <StyledContainer>
            <h1>
                Profil
            </h1>
            {loading && <Loader></Loader>}
            {error && (
                <div>{`Nous rencontrons un problème pour récupérer les données du profil et pour les afficher. - ${error}`}</div>
            )}
            
            { isImageProfil ? (    
                    <ConnectionForm>
                        
                        <StyledDivImageProfil>
                            <StyledImageProfil src={user.imageUrl} alt="imageUser" />
                        </StyledDivImageProfil>
                        <div>
                        <StyledDivIconeModifyProfil>
                            <StyledIconeModifyProfil src={crayon} /*onClick={modifyPost}*/ alt="imageModifyPost" />
                        </StyledDivIconeModifyProfil>
                        <StyledDivIconeDeleteProfil>
                            {/* <DeleteProfil data={data} setData={setData} idPost={item._id} idUserPost={item.userId} /> */}
                            <StyledIconeDeleteProfil src={poubelle} /*onClick={deletePost}*/ alt="imageDeletePost" />
                            </StyledDivIconeDeleteProfil>
                        </div>
                        <StyledProfilInformation>
                                <StyledFirstnameLastname>{user.firstname} {user.lastname}</StyledFirstnameLastname>
                                <StyledEmail>email : {user.email}</StyledEmail>
                        </StyledProfilInformation> 
                    </ConnectionForm>   
            ) : (
                        <ConnectionForm>
                            
                            <StyledDivImageProfil>
                                <StyledImageProfil src={profile} alt="profileImageDefaut" />
                            </StyledDivImageProfil>
                            <StyledIconesProfil>
                            <StyledDivIconeModifyProfil>
                                <StyledIconeModifyProfil src={crayon} /*onClick={modifyPost}*/ alt="imageModifyPost" />
                            </StyledDivIconeModifyProfil>
                            <StyledDivIconeDeleteProfil>
                            {/* <DeleteProfil data={data} setData={setData} idPost={item._id} idUserPost={item.userId} /> */}
                             <StyledIconeDeleteProfil src={poubelle} /*onClick={deletePost}*/ alt="imageDeletePost" /> 
                            </StyledDivIconeDeleteProfil>
                            </StyledIconesProfil>
                            <StyledProfilInformation>
                                <StyledFirstnameLastname>{user.firstname} {user.lastname}</StyledFirstnameLastname>
                                <StyledEmail>{user.email}</StyledEmail>
                                {/* <div>userId : {user._id}</div>
                                <div>Admin ? {String(user.isAdmin)}</div> */}
                            </StyledProfilInformation>
                        </ConnectionForm>
            )} 
            
              
        </StyledContainer>
    );
}