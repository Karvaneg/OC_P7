import { DocumentTitle, useDocumentTitle } from "../../utils/hooks/setDocumentTitle" 
import { StyledHeaderContenairPost, StyledContenairPosts, StyledCardPost, StyledAuthorPost, StyledBodyContenairPost, 
  StyledFooterContenairPost, StyledDivIconeModifyPost, StyledDivImagePost, StyledPublishedDate, StyledLike, StyledImageLike, 
  StyledImagePost, StyledContenuPost, StyledDescriptionPost, StyledTitlePost, /*StyledTitleH1,*/ StyledIconesPost, 
  StyledIconeModifyPost, StyledDivIconeDeletePost, StyledHeaderDashBoard, StyledModal, StyledFormGroup, StyledTextSpecifiedFormatFile} from './dashboardStyle'
import React, { useState, useEffect, useContext } from "react"
import Moment from 'react-moment';
import crayon from '../../assets/crayon.png'
//import poubelle from '../../assets/poubelle.png'
import like from '../../assets/like_hover.png'
//import { modifyPost } from "../../../../backend/controllers/post";
//import  getPosts  from '../../components/Posts'
import { useModal, Modal } from "../../utils/hooks/setModal";
import { Loader } from "../../utils/style/theme/loader";
import colors from '../../utils/style/colors'
import DeletePost from "../../components/Posts/DeletePost";
import ModifyPost from "../../components/Posts/ModifyPost";
import { UserContext } from "../../utils/context/DataUserConnectedContext";


function Dashboard() {
    useDocumentTitle(`${DocumentTitle.dashboard}`);
    const { isShowing: isAddPost, toggle: toggleAddPost} = useModal();
    const userConnected = useContext(UserContext);

// [1] state (état, données)
    const token = localStorage.getItem("token");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState();
    //const [ titlePost, setTitlePost ] = useState();
    //const [ descriptionPost, setDescriptionPost ] = useState();
    const [ isImagePost, setIsImagePost ] = useState(false);



// [2] comportements

 // On récupère tous les posts de la base de données
 useEffect(() => {
  fetch('http://localhost:8000/api/posts', { headers: {"Authorization" : `Bearer ${token}`} } )
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        `This is an HTTP error: The status is ${response.status}`
      );
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
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
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

// On ajoute un nouveau Post au tableau de Bord

   const [imageHandlePost, setImageHandlePost] = useState("");
   const [titleHandlePost, setTitleHandlePost] = useState("");
   const [descriptionHandlePost, setDescriptionHandlePost] = useState("");

  const createPost = () => {
    
      const formData = new FormData();
      formData.append("title", titleHandlePost);
      formData.append("description", descriptionHandlePost);
      formData.append("image", imageHandlePost);
      formData.append("userId", userConnected._id);
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
            'Authorization': `Bearer ${token}`,
          },
          body:  formData
      };
      // Call API pour la connexion
      fetch("http://localhost:8000/api/posts", dataMethodPost)
        .then((response) => response.json(
          console.log("Réponse statut" + response.status)))
         .then((postData) => {
           console.log(postData);
           alert ("Votre post a bien été créé.");
         })
        .catch((err) => {
          console.log("Erreur Fetch", err);
          alert ("Un problème a été rencontré lors de l'envoi du formulaire.");
      });
  }

// On modifie un Post




// [3] affichage (render et rerender)
  return (
    
    <div>
      <h1>Bienvenue {userConnected.firstname} {userConnected.lastname} !</h1>
      <StyledHeaderDashBoard>
        <StyledModal>
          <button className="modal-toggle" onClick={toggleAddPost}>
            Ajouter un post
          </button>
          <Modal isShowing={isAddPost} hide={toggleAddPost} title="Ajouter un post">
            <form onSubmit={createPost} name="postInfo">
              <StyledFormGroup>
                <input type="text" name="title" onChange={(e) => setTitleHandlePost(e.target.value)} value={titleHandlePost} placeholder="Titre" required/>
              </StyledFormGroup>
              <StyledFormGroup>
                <textarea name="description" onChange={(e) => setDescriptionHandlePost(e.target.value)} value={descriptionHandlePost} placeholder="Description" required></textarea>
              </StyledFormGroup>
              <StyledFormGroup>
                <StyledTextSpecifiedFormatFile>Choisissez une image à télécharger au format autorisé (PNG, JPG ou JPEG)</StyledTextSpecifiedFormatFile>
                <input id="fileImagePost" type="file" name="imageUrl" accept=".jpg, .jpeg, .png" onChange={(e) => setImageHandlePost(e.target.files[0], e.target.files[0].name)} /*onChange={imageHandlePost}*/ required/>
              </StyledFormGroup>
              <StyledFormGroup>
                <input type="submit" value="Valider" />
              </StyledFormGroup>
            </form>
          </Modal>
        </StyledModal>
      </StyledHeaderDashBoard>
      
      {loading && <Loader></Loader>}
      {error && (
        <div>{`Nous rencontrons un problème pour récupérer les données des posts et les afficher sur le Tableau de bord - ${error}`}</div>
      )}
      <StyledContenairPosts>
        {data && data.map((item) => (
            <StyledCardPost key={item._id}>

                <StyledHeaderContenairPost>
                    {user && user.map((author) => {
                        if(author._id === item.userId){
                            return <StyledAuthorPost key={"AuthorPost" +author._id}>Auteur : {author.firstname} {author.lastname} </StyledAuthorPost>
                        } else {
                            return null
                        }
                    })}
                    <StyledTitlePost>{item.title}</StyledTitlePost>
                    <StyledIconesPost>
                       <StyledDivIconeModifyPost>
                            <ModifyPost data={data} setData={setData} idPost={item._id} idUserPost={item.userId} />
                            {/* <StyledIconeModifyPost src={crayon} onClick={modifyPost} alt="imageModifyPost" /> */}
                        </StyledDivIconeModifyPost>
                        <StyledDivIconeDeletePost>
                            <DeletePost data={data} setData={setData} idPost={item._id} idUserPost={item.userId} />
                            {/* <ImageDeletePost src={poubelle} onClick={deletePost} alt="imageDeletePost" /> */}
                        </StyledDivIconeDeletePost>
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
                    <StyledPublishedDate>Publié le : <Moment format="DD/MM/YYYY" key={"date" + item.userId}>{item.publishedDate}</Moment></StyledPublishedDate>
                    <div>
                        <StyledLike>
                        {item.likes} like(s)
                            <StyledImageLike src={like} alt="imageLike" />
                        </StyledLike>
                    </div>
                </StyledFooterContenairPost>

            </StyledCardPost>
          ))}
     </StyledContenairPosts> 
    
    </div>
  ); 
 }
 export default Dashboard;