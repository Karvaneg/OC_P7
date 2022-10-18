import { DocumentTitle, useDocumentTitle } from "../../utils/hooks/setDocumentTitle" 
import { HeaderContenairPost, /*Loader,*/ ContenairPosts, CardPost, 
  AuthorPost, BodyContenairPost, FooterContenairPost, ImageModifyPost, 
  ImageDeletePost, ProfileImageDefaut, PublishedDate, Like, ImageLike, 
  ImagePost, ContenuPost, DescriptionPost, TitlePost, /*TitleH1,*/ IconesPost, 
  IconesModify, IconesDelete, HeaderDashBoard} from '../../utils/style/Theme'
import { useState, useEffect } from "react"
import Moment from 'react-moment';
import crayon from '../../assets/crayon.png'
import poubelle from '../../assets/poubelle.png'
import like from '../../assets/like_hover.png'
//import { modifyPost } from "../../../../backend/controllers/post";
//import  getPosts  from '../../components/Posts'
import React from "react";
import { useModal, Modal } from "../../utils/hooks/setModal";
import { Loader } from "../../utils/style/theme/loader";
import colors from '../../utils/style/colors'

function Dashboard() {
    useDocumentTitle(`${DocumentTitle.dashboard}`);
    const { isShowing: isAddPost, toggle: toggleAddPost} = useModal();
    

// [1] state (état, données)
    const token = localStorage.getItem("token");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState();


// [2] comportements
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

// On récupère les infos de l'utilisateur connecté
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

// [3] affichage (render et rerender)
  return (
    
    <div>
      <HeaderDashBoard>
        <h1>
          Tableau de bord
        </h1>
      
        <div className="App">
          <button className="modal-toggle" onClick={toggleAddPost}>
            Ajouter un post
          </button>

          <Modal isShowing={isAddPost} hide={toggleAddPost} title="Ajouter un post">
            <form>
              <div className="form-group">
                <input type="text" placeholder="Titre" />
              </div>
              <div className="form-group">
                <textarea placeholder="Description"></textarea>
              </div>
              <div className="form-group">
                <input type="file" onChange={""} />
              </div>
              <div className="form-group">
                <input type="submit" value="Valider" />
              </div>
            </form>
          </Modal>
        </div>
      <style jsx="true">{`
        .App {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        button.modal-toggle,
        input[type="submit"] {
          background-color: ${colors.secondary};
          cursor: pointer;
          padding: 10px 15px;
          text-transform: uppercase;
          border: none;
        }

        button.modal-toggle:not(:first-child) {
          margin-left: 10px;
        }

        .form-group {
          margin-top: 10px;
        }

        input[type="text"],
        input[type="password"],
        input[type="email"], textarea {
          box-sizing: border-box;
          width: 100%;
          padding: 0.5rem 0.7rem;
        }

        textarea {
          max-width: 100%;
          height: 132px;
        }
      `}</style>

      </HeaderDashBoard>
      
      {loading && <Loader></Loader>}
      {error && (
        <div>{`Nous rencontrons un problème pour récupérer les données des posts et les afficher sur le Tableau de bord - ${error}`}</div>
      )}
      <ContenairPosts>
        {data &&
          data.map((item) => (
            <CardPost key={item._id}>
                <HeaderContenairPost>
                    {user && user.map((author) => {
                        if(author._id === item.userId){
                            return <AuthorPost key={"AuthorPost" +author._id}>Auteur : {author.firstname} {author.lastname} </AuthorPost>
                        } else {
                            return null
                        }
                    })}
                    <TitlePost>{item.title}</TitlePost>
                    <IconesPost>
                       <IconesModify>
                            <ImageModifyPost src={crayon} /*onClick={modifyPost}*/ alt="imageModifyPost" />
                        </IconesModify>
                        <IconesDelete>
                            <ImageDeletePost src={poubelle} /*onClick={deletePost}*/ alt="imageDeletePost" />
                        </IconesDelete>
                    </IconesPost>
                </HeaderContenairPost>
                <BodyContenairPost>
                    <ImagePost>
                        <ProfileImageDefaut src={item.imageUrl} alt="imagePost" />
                    </ImagePost>
                    <ContenuPost>
                        <DescriptionPost>{item.description}</DescriptionPost>
                    </ContenuPost>
                    
                </BodyContenairPost>
                <FooterContenairPost>
                    <PublishedDate>Publié le : <Moment format="DD/MM/YYYY" key={"date" + item.userId}>{item.publishedDate}</Moment></PublishedDate>
                    <div>
                        <Like>
                        {item.likes} like(s)
                            <ImageLike src={like} alt="imageLike" />
                        </Like>
                    </div>
                </FooterContenairPost>
            </CardPost>
          ))}
     </ContenairPosts> 
    
    </div>
  ); 
 }
 export default Dashboard;