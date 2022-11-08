import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';
import liked from '../../assets/like_hover.png'
import unliked from '../../assets/like.png'
import { StyledImageLike, StyledLike } from '../../pages/Dashboard/dashboardStyle';


function LikePost({ data, setData, numberLike, usersliked, idPost, publishedDate }) {
    const {user, setUser} = useContext(UserContext);
    const isToken = localStorage.getItem("token");
    const [isLiked, setIsLiked] = useState(false);

    const postSelect = data.find(itemSelect => itemSelect._id === idPost);
     //   console.log(postSelect);
    
    function onLike(event){
        event.preventDefault();
        alert("Clique réalisé sur " +JSON.stringify(idPost)+ "par " +user.firstname + user.lastname);
      
        console.log("utilisateur connecté :" + user._id);
    
      // On s'assure que l'id de l'utilisateur n'est pas déjà dans la base de données (dans l'array usersLiked), avant d'ajouter un like 
      if (usersliked.indexOf(user._id) === -1) {

        // On cré un objet dans lequel on met les infos "like" que l'on envoie au backend
        const dataLike = {
            like: 1,
            userId: user._id,
        }
        // On indique la méthode d'envoi des données
        const dataMethod = {
            method: 'POST',
            headers: {
                'Accept': 'application/json', 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${isToken}`,
            },
            body: JSON.stringify(dataLike),
        };
            console.log(dataMethod);

            // Call API
            fetch(`http://localhost:8000/api/posts/${idPost}/like`, dataMethod)

            .then((response) => {
                console.log(response.status);
                return response.json();
            })
              .then((res) => {
                
                const newNumberLike = (numberLike + res.like);

                const postModify = {
                    ...postSelect,
                    likes: newNumberLike,
                    usersLiked: [user._id],
                    publishedDate: publishedDate
                  };
                  console.log(postModify);
                  const recherche = data.filter((item) => item._id !== idPost);
                      console.log(recherche);
                  setData([...recherche, postModify]);
                  console.log(data);
                  
                  setIsLiked(true);
                   
                alert("Le post a bien été liké !");
              })

                .catch((err) => {
                    console.log("Erreur de Like", err);
                    alert ("Un problème a été rencontré lors du like du post." +idPost);
                });

            } else {
                // si l'id de l'utilisateur est déjà dans la base de données (dans l'array usersLiked), on enlève un like
                // On cré un objet dans lequel on met les infos "like" que l'on envoie au backend
                const dataLike = {
                    like: 0,
                    userId: user._id,
                }
                // On indique la méthode d'envoi des données
                const dataMethod = {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json', 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${isToken}`,
                    },
                    body: JSON.stringify(dataLike),
                };
                    console.log(dataMethod);

                    // Call API
                    fetch(`http://localhost:8000/api/posts/${idPost}/like`, dataMethod)

                    .then((response) => {
                        return response.json();
                      })
                        .then((res) => {
                            
                            const newNumberLike = (numberLike - 1);
                                console.log(newNumberLike);

                            const postModify = {
                                ...postSelect,
                                likes: newNumberLike,
                                publishedDate: publishedDate
                              };
                              console.log(postModify);
                              const recherche = data.filter((item) => item._id !== idPost);
                                  console.log(recherche);
                              setData([...recherche, postModify]);
                              console.log(data);
                              setIsLiked(false);
                            alert("Vous avez disliké ce post");
                        })

                    .catch((err) => {
                        console.log("Erreur de dislike", err);
                        alert ("Un problème a été rencontré lors du dislike du post." +idPost);
                    });
            }
    }

 return (
    <div>
        { isLiked && (
            <StyledLike>{numberLike} like(s)<StyledImageLike src={liked} onClick={onLike} alt="imageLiked" /></StyledLike>
        )}
        { isLiked === false && (
            <StyledLike>{numberLike} like(s)<StyledImageLike src={unliked} onClick={onLike} alt="imageUnliked" /></StyledLike>
            
        )}
    </div>
 )
}
export default LikePost;