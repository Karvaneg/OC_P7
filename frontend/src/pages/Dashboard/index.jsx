import { DocumentTitle, useDocumentTitle } from "../../utils/hooks/setDocumentTitle" 
import { StyledHeaderContenairPost, StyledContenairPosts, StyledCardPost, StyledAuthorPost, StyledBodyContenairPost, 
  StyledFooterContenairPost, StyledDivImagePost, StyledPublishedDate, StyledLike, 
  StyledImagePost, StyledContenuPost, StyledDescriptionPost, StyledTitlePost, StyledIconesPost, 
  StyledHeaderDashBoard, StyledModal } from './dashboardStyle'
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
    const userConnected = useContext(UserContext);

  // [1] state (état, données)
    const token = localStorage.getItem("token");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState();

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
            setUser(usersData);
            setError(null);
        })
        .catch((err) => {
            setError(err.message);
            setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }, [token]);

  // [3] affichage (render et rerender)
  return (
    <div>
      <h1>Bienvenue {userConnected.firstname} {userConnected.lastname} !</h1>

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

        {data && [...data].reverse().map((item) => {return(
            <StyledCardPost key={item.publishedDate}>

                <StyledHeaderContenairPost>
                    {user && user.map((author) => {
                        if(author._id === item.userId){
                            return <StyledAuthorPost key={"AuthorPost" +author._id}>Auteur : {author.firstname} {author.lastname} </StyledAuthorPost>
                        } else {
                            return null
                        }
                    })}
           {/* //////// Rajouter si l'utilisateur a été supprimé "Auteur: Inconnu"////////// */}
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
                        <StyledLike>
                            <AddLike key={"likes" +item.likes+item._id} data={data} setData={setData} numberLike={item.likes} usersliked={item.usersLiked} idPost={item._id} />
                        </StyledLike>
                    </div>
                </StyledFooterContenairPost>

            </StyledCardPost>
          )})}
     </StyledContenairPosts> 
    
    </div>
  ); 
 }
 export default Dashboard;