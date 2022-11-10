import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';
import liked from '../../assets/like_hover.png'
import unliked from '../../assets/like.png'
import { StyledImageLike, StyledLike } from './likePostStyle';


function LikePost({ data, setData, numberLike, usersliked, idPost, publishedDate }) {
    const {user, setUser} = useContext(UserContext);
    const isToken = localStorage.getItem("token");
    const [isLiked, setIsLiked] = useState(false);
    const [newUsersLiked, setNewUsersLiked] = useState(usersliked);

   // const postSelect = data.find(itemSelect => itemSelect._id === idPost);
    
    
    function onLike(event){
        event.preventDefault();
      //  alert("Clique réalisé sur " +JSON.stringify(idPost)+ "par " +user.firstname + user.lastname);
    
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
               // console.log(res.userId);
                const addUserIdLiked = res.userId;

                // const filteredUsersliked = usersliked.filter((id) => id !== user._id);
                // console.log(filteredUsersliked);
                const newListUsersLiked = newUsersLiked.concat(addUserIdLiked);
              //  console.log(newListUsersLiked);
              //  console.log(newUsersLiked);

               // setNewUsersLiked(usersliked).push(newUsersLiked);

                //  const newListUsersLiked = usersliked.push(user._id);
                //  console.log(newListUsersLiked);
                // setNewUsersLiked(newListUsersLiked);

                const newPostList = data.map(post => post._id !== idPost ? post: {...post, likes: newNumberLike, usersLiked: newListUsersLiked});
               // console.log(newPostList);
                setData(newPostList);
                
                
                // const postModify = {
                //     ...postSelect,
                //     likes: newNumberLike,
                //     usersLiked: newUsersLiked,
                //     publishedDate: publishedDate
                //   };
                //   console.log(newUsersLiked);
                //   console.log(postSelect);
                //   console.log(postModify);
                //   const recherche = data.filter((item) => item._id !== idPost);
                //       console.log(recherche);
                //   setData([...recherche, postModify]);
                //  setIsLiked(true);
                   
               // alert("Le post a bien été liké !");
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
                   // console.log(dataMethod);

                    // Call API
                    fetch(`http://localhost:8000/api/posts/${idPost}/like`, dataMethod)

                    .then((response) => {
                        console.log(response.status);
                        return response.json();
                      })
                        .then((res) => {
                          //  console.log(res);
                            const newNumberLike = (numberLike - 1);
                              //  console.log(newNumberLike);
                            
                            // const newUsersLike = usersliked.splice(user._id) ;
                            // console.log(newUsersLike);
                            const filteredUsersliked = usersliked.filter((id) => id !== user._id);
                          //  console.log(filteredUsersliked);

                            const newPostList = data.map(post => post._id !== idPost ? post: {...post, likes: newNumberLike, usersLiked: filteredUsersliked});
                          //  console.log(newPostList);
                            setData(newPostList);

                            // const postModify = {
                            //     ...postSelect,
                            //     likes: newNumberLike,
                            //     usersLiked: filteredUsersliked,
                            //     publishedDate: publishedDate
                            //   };
                            //   console.log(postModify);
                            //   const recherche = data.filter((item) => item._id !== idPost);
                            //       console.log(recherche);
                            //   setData([...recherche, postModify]);
                            //   console.log(data);
                            //  setIsLiked(false);
                        //    alert("Vous avez disliké ce post");
                        })

                    .catch((err) => {
                        console.log("Erreur de dislike", err);
                        alert ("Un problème a été rencontré lors du dislike du post." +idPost);
                    });
            }
    }

    useEffect(() => {
        // si l'utilisateur n'est pas dans la base de données (dans le tableau des utilisateurs qui ont déjà liké le post)
        if (usersliked.indexOf(user._id) === -1) {
            // le pouce s'affiche en gris
            setIsLiked(false);
            console.log("pouce gris");
        // sinon
        } else {
            // le pouce s'affiche en rouge
            setIsLiked(true);  
            console.log("Pouce rouge");
        };
    }, [user._id, usersliked, isLiked, setIsLiked, newUsersLiked]);

 return (
    <div>
        { isLiked && (
            <StyledLike>{numberLike} like(s)<StyledImageLike src={liked} onClick={onLike} alt="postLiked" /></StyledLike>
        )}
        { !isLiked && (
            <StyledLike>{numberLike} like(s)<StyledImageLike src={unliked} onClick={onLike} alt="postUnliked" /></StyledLike>
            
        )}
    </div>
 )
}
export default LikePost;