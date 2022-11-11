import {DocumentTitle} from "../../utils/hooks/setDocumentTitle" 
import {useDocumentTitle} from "../../utils/hooks/setDocumentTitle"
import { StyledContainer, ConnectionForm, StyledDivImageProfil, StyledImageProfil, StyledProfilInformation, 
    StyledFirstnameLastname, StyledEmail, StyledIconesProfil, StyledPublicationsProfil,
    StyledFooterContenairPost,StyledBodyContenairPost,StyledDivImagePost,StyledImagePost,StyledContenuPost,
    StyledDescriptionPost,StyledPublishedDate,StyledContenairPosts,StyledCardPost, StyledHeaderContenairPost, StyledAuthorPost,
    StyledTitlePost,StyledIconesPost, StyledInformationsProfil, StyledImageProfilPost, StyledProfil } from "./profilStyle";
import React, { useContext, useState, useEffect } from 'react';
import profile from '../../assets/defaultImageProfile.png'
import { Loader } from "../../utils/style/loader";
import Moment from 'react-moment';
import DeletePost from "../../components/Posts/DeletePost";
import ModifyPost from "../../components/Posts/ModifyPost";
import AddLike from "../../components/Posts/LikePost";
import { UserContext } from "../../utils/context/DataUserConnectedContext";
import DeleteProfil from "../../components/Profil/DeleteProfil";
import ModifyProfil from "../../components/Profil/ModifyProfil";


export default function Profil() {

    useDocumentTitle(`${DocumentTitle.profil}`);

    // [1] state (état, données)
    // On récupère les données de l'utilisateur connecté, grâce au Context
    const {user, setUser} = useContext(UserContext);
    const [data, setData] = useState([]);
    // On récupère le token dans le localstorage
    const isToken = localStorage.getItem("token");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isImageProfil, setIsImageProfil] = useState(true);
    const [isAdminProfil, setIsAdminProfil] = useState(false);
    
    // [2] comportements
    
    // On récupère tous les posts de la base de données
    useEffect(() => {
        fetch('http://localhost:8000/api/posts', { headers: {"Authorization" : `Bearer ${isToken}`} } )
          .then((response) => {
            if (!response.ok) {
              throw new Error(`This is an HTTP error: The status is ${response.status}`);
            }
            return response.json();
          })
          .then((PostsData) => {
            // on filtre tous les posts pour n'afficher que les posts de l'utilisateur connecté...
            const recherche = PostsData.filter((item) => item.userId === user._id);
            setData([...recherche]);
            setError(null);
          })
          .catch((err) => {
            setError(err.message);
            setData(null);
          })
          .finally(() => {
            setLoading(false);
          });
        }, [isToken, user._id]);

        // Si imageUrl n'est pas définie ou vide, on met une image de profil par défaut
        useEffect(() => {
            if(user.imageUrl === "undefined" || user.imageUrl === ""){
                setIsImageProfil(false);
            } else {
                setIsImageProfil(true);
            };
        }, [user.imageUrl]);

        // S'il s'agit du profil de l'administrateur, on ne met pas l'icône "Suppression"
        useEffect(() => {
            if(user.isAdmin === true){
                setIsAdminProfil(false);
            } else {
                setIsAdminProfil(true);
            };
        }, [ user.isAdmin ]);


    // [3] affichage (render et rerender)
    return (
        <StyledProfil>
            <h1>
               Mon Profil
            </h1>
            {loading && <Loader></Loader>}
            {error && (
                <div>{`Nous rencontrons un problème pour récupérer les données du profil et pour les afficher. - ${error}`}</div>
            )}
            <StyledContainer>
                <StyledInformationsProfil>
                    <h2>
                        Mes informations
                    </h2>
                    <ConnectionForm>
                        <StyledDivImageProfil>
                        { isImageProfil ? ( 
                            <StyledImageProfil src={user.imageUrl} alt="imageUser" />
                        ) : (
                            <StyledImageProfil src={profile} alt="profileImageDefaut" />
                        )}
                        </StyledDivImageProfil>
                        { isAdminProfil ? ( 
                        <StyledIconesProfil>
                            <ModifyProfil userProfil={user} setUserProfil={setUser} />
                            <DeleteProfil userProfil={user} /> 
                        </StyledIconesProfil>
                        ) : (
                            <StyledIconesProfil>
                                <ModifyProfil userProfil={user} setUserProfil={setUser} />
                            </StyledIconesProfil>
                        )}  
                        <StyledProfilInformation>
                                <StyledFirstnameLastname>{user.firstname} {user.lastname}</StyledFirstnameLastname>
                                <StyledEmail>{user.email}</StyledEmail>
                        </StyledProfilInformation> 
                    </ConnectionForm>
                </StyledInformationsProfil>

                <StyledPublicationsProfil>
                    <h2>
                        Mes publications
                    </h2>
                    <StyledContenairPosts>
                        {data && [...data].reverse().map((item) => ( 
                            <StyledCardPost key={item._id}>
                                <StyledHeaderContenairPost>
                                    <StyledAuthorPost key={"AuthorPost" +user._id}><StyledImageProfilPost src={user.imageUrl} alt="PhotoUtilisateur"/> {user.firstname} {user.lastname} </StyledAuthorPost>
                                    <StyledTitlePost key={"title" +item.title+item._id}>{item.title}</StyledTitlePost>
                                    <StyledIconesPost>
                                        <ModifyPost data={data} setData={setData} idPost={item._id} idUserPost={item.userId} />
                                        <DeletePost data={data} setData={setData} idPost={item._id} idUserPost={item.userId} />
                                    </StyledIconesPost>
                                </StyledHeaderContenairPost>

                                <StyledBodyContenairPost>
                                    <StyledDivImagePost>
                                        <StyledImagePost key={"title" +item.imageUrl+item._id} src={item.imageUrl} alt="imagePost" />
                                    </StyledDivImagePost>
                                    <StyledContenuPost>
                                        <StyledDescriptionPost key={"title" +item.description+item._id}>{item.description}</StyledDescriptionPost>
                                    </StyledContenuPost>
                                </StyledBodyContenairPost>

                                <StyledFooterContenairPost>
                                    <StyledPublishedDate>
                                        Publié le : <Moment format="DD/MM/YYYY" key={"date" +item.userId+item.publishedDate}>{item.publishedDate}</Moment>
                                    </StyledPublishedDate>
                                    <div>
                                        <AddLike key={"likes" +item.likes+item._id} data={data} setData={setData} numberLike={item.likes} usersliked={item.usersLiked} idPost={item._id} />
                                    </div>
                                </StyledFooterContenairPost>
                            </StyledCardPost>
                        ))}
                    </StyledContenairPosts>
                </StyledPublicationsProfil>
            </StyledContainer>
        </StyledProfil>
    );
}