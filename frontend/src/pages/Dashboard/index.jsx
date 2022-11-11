import { DocumentTitle, useDocumentTitle } from "../../utils/hooks/setDocumentTitle" 
import { StyledHeaderContenairPost, StyledContenairPosts, StyledCardPost, StyledAuthorPost, StyledBodyContenairPost, 
  StyledFooterContenairPost, StyledDivImagePost, StyledPublishedDate, 
  StyledImagePost, StyledContenuPost, StyledDescriptionPost, StyledTitlePost, StyledIconesPost, 
  StyledHeaderDashBoard, StyledModal, StyledImageProfil, StyledDivNoAuthor, StyledDashboard } from './dashboardStyle'
import React, { useState, useEffect, useContext } from "react"
import Moment from 'react-moment';
import { Loader } from "../../utils/style/loader";
import DeletePost from "../../components/Posts/DeletePost";
import ModifyPost from "../../components/Posts/ModifyPost";
import CreatePost from "../../components/Posts/CreatePost";
import AddLike from "../../components/Posts/LikePost";
import { UserContext } from "../../utils/context/DataUserConnectedContext";


function Dashboard() {

    useDocumentTitle(`${DocumentTitle.dashboard}`);
   
    // [1] state (état, données)
    // On récupère les données de l'utilisateur connecté, grâce au Context
    const {user, setUser} = useContext(UserContext);
    // On récupère le token dans le localstorage
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState();
    const [isLiked, setIsLiked] = useState(false);

  // [2] comportements
    // On récupère tous les posts de la base de données
    useEffect(() => {
      fetch('http://localhost:8000/api/posts', { headers: {"Authorization" : `Bearer ${token}`} } )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`This is an HTTP error: The status is ${response.status}`);
          }
          return response.json();
        })
        .then((PostsData) => {
          setData(PostsData);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [ token ]);

    // On récupère les infos de tous les utilisateurs
    useEffect(() => {
      fetch(`http://localhost:8000/api/profils`, { headers: {"Authorization" : `Bearer ${token}`} })
        .then((response) => {
            if (!response.ok) {
              throw new Error(`This is an HTTP error: The status is ${response.status}`);
            }
            return response.json();
            })
        .then((usersData) => {
            setUserData(usersData);
            setError(null);
        })
        .catch((err) => {
            setError(err.message);
            setUserData(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [token]);


  // [3] affichage (render et rerender)
  return (
    <StyledDashboard>
      <h1>Bienvenue {user.firstname} {user.lastname} !</h1>
      <StyledHeaderDashBoard>
        <StyledModal>
           <CreatePost data={data} setData={setData} /> 
        </StyledModal>
      </StyledHeaderDashBoard>
      
      {loading && <Loader></Loader>}
      {error && (
        <div>{`Nous rencontrons un problème pour récupérer les données des posts et les afficher sur le Tableau de bord - ${error}`}</div>
      )}

      <StyledContenairPosts>
        {data && [...data].reverse().map((item) => ( 
            <StyledCardPost key={item._id}>
                <StyledHeaderContenairPost>
                  <StyledDivNoAuthor>
                    {userData && userData.map((author) => {
                        if(author._id === item.userId){
                            return <StyledAuthorPost key={author._id}><StyledImageProfil src={author.imageUrl} alt="PhotoUtilisateur"/> {author.firstname} {author.lastname} </StyledAuthorPost>
                        } else {
                            return null
                        }
                    })}
                  </StyledDivNoAuthor>
           {/* //////// Axe d'amélioration : Rajouter si l'utilisateur a été supprimé "Auteur: Inconnu"////////// */}
                  <StyledTitlePost>{item.title}</StyledTitlePost>
                  <StyledIconesPost>
                      <ModifyPost data={data} setData={setData} idPost={item._id} idUserPost={item.userId} />
                      <DeletePost data={data} setData={setData} idPost={item._id} idUserPost={item.userId} />
                  </StyledIconesPost>
                </StyledHeaderContenairPost>

                <StyledBodyContenairPost>
                    <StyledDivImagePost>
                      <StyledImagePost src={item.imageUrl} alt="imagePost" />
                    </StyledDivImagePost>
                    <StyledContenuPost>
                        <StyledDescriptionPost>{item.description}</StyledDescriptionPost>
                    </StyledContenuPost>
                </StyledBodyContenairPost>

                <StyledFooterContenairPost>
                    <StyledPublishedDate>
                      Publié le : <Moment format="DD/MM/YYYY">{item.publishedDate}</Moment>
                    </StyledPublishedDate>
                    <div>
                        <AddLike isLiked={isLiked} setIsLiket={setIsLiked} data={data} setData={setData} numberLike={item.likes} usersliked={item.usersLiked} idPost={item._id} />
                    </div>
                </StyledFooterContenairPost>

            </StyledCardPost>
          ))}
     </StyledContenairPosts> 
    
    </StyledDashboard>
  ); 
 }
 export default Dashboard;