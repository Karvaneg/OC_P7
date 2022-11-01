import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';
import liked from '../../assets/like_hover.png'
import unliked from '../../assets/like.png'
import { StyledImageLike, StyledLike } from '../../pages/Dashboard/dashboardStyle';


function LikePost({ data, setData, numberLike, usersliked, idPost  }) {
    const user = useContext(UserContext);
    const isToken = localStorage.getItem("token");
    const [likesCounter, setLikesCounter] = useState(numberLike); 
    const [foundUserConnected, setFoundUserConnected] = useState(usersliked);
    const [isLiked, setIsLiked] = useState(true);
    const [newNumberDislike, setNewNumberDislike] = useState("");
    const postSelect = data.find((itemSelect) => itemSelect._id === idPost);
        console.log(postSelect);
    
    function onLike(event){
        event.preventDefault();
        alert("Clique réalisé sur " +JSON.stringify(idPost)+ "par " +user.firstname + user.lastname);
        console.log(usersliked);
        console.log("utilisateur connecté :" + user._id);
        console.log(numberLike);
        console.log(likesCounter);
        const arrayUsersLiked = usersliked;
        const userConnected = user._id;
    
        
        setFoundUserConnected(arrayUsersLiked.filter((element) => element === user._id));
        console.log(foundUserConnected);
      // On s'assure que l'id de l'utilisateur n'est pas déjà dans la base de données (dans l'array usersLiked), avant d'ajouter un like 
      if (!foundUserConnected) {

        // const incNumberLike = ++numberLike;
        // console.log(incNumberLike);
        

        // On cré un objet dans lequel on met les infos "like" que l'on envoie au backend
        const dataLike = {
            like: 1,
            userId: userConnected,
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

        
        // const formData = new FormData();
        // formData.append("like", incNumberLike);
        // formData.append("userId", user._id);

         // On indique la méthode d'envoi des données
            // Options de la requête fetch => POST et Autorisation
            // const requestOptions = {
            //     method: 'POST',
            //     headers: {
            //         'Accept': 'application/json',
            //         'Authorization': `Bearer ${isToken}`,
            //     },
            //     body:  formData
            // };
            // console.log(requestOptions);
            // Call API
            fetch(`http://localhost:8000/api/posts/${idPost}/like`, dataMethod)

            .then((response) => {
                console.log(response.status);
                return response.json();
            })
              .then((res) => {
                console.log(res);
                
                // const recherche = data.find((item) => item._id === res.postId);
                // console.log(res.like);
                const newNumberLike = (numberLike + res.like);
                console.log(newNumberLike);
                // recherche.likes = newNumberLike;
                // setLikesCounter(recherche.likes);
                // setData([...data, likesCounter]);

                const postModify = {
                    ...postSelect,
                    likes: newNumberLike,
                    usersLiked: [userConnected]
                  };
                  console.log(postModify);
                  const recherche = data.filter((item) => item._id !== idPost);
                      console.log(recherche);
                  setData([...recherche, postModify]);
                  console.log(data);


                // const postModify = {
                //          _id: res.postId,
                //          likes: newNumberLike
                //  };
                //  console.log(postModify)
                //  setData([...data, postModify]);

               // setLikesCounter(likesCounter + 1 );
              //  console.log(likesCounter);

                
                // const postCopy = [...data, res];
                // console.log(postCopy);
                // const indexPostToUpdate = data.findIndex((post) => post._id === res.data._id);
                // console.log(indexPostToUpdate);
                // postCopy[indexPostToUpdate].like=res.data.like;
                // setData(postCopy);

               
                
                // setData([...data, likesCounter]);
                // console.log(data);
                // console.log("TEST");
                // console.log(imageHandlePost);
                // console.log(postSelect);
                    // const postModify = {
                  
                    //    like: likesCounter,
                    //    userId: user._id
                    // };
                //  console.log(postModify);
                // // const recherche = data.filter((item) => item._id === idPost);
                // //     console.log(recherche);
                  // setData([...data, postModify]);
                   
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
                            
                            if(numberLike === 0){
                                setNewNumberDislike(numberLike);
                            } else {
                                setNewNumberDislike(numberLike - res.like);
                            }

                            const postModify = {
                                ...postSelect,
                                likes: numberLike,
                              };
                              console.log(postModify);
                              const recherche = data.filter((item) => item._id !== idPost);
                                  console.log(recherche);
                              setData([...recherche, postModify]);
                              console.log(data);
                            alert("Vous avez disliké ce post");
                        })

                    .catch((err) => {
                        console.log("Erreur de dislike", err);
                        alert ("Un problème a été rencontré lors du dislike du post." +idPost);
                    });
            }
    }

    useEffect(() => {
    if(numberLike >= 1){
        setIsLiked(true);
        console.log(isLiked, numberLike);
    } else {
        setIsLiked(false);
        console.log(isLiked, numberLike);
    };
    }, [isLiked, numberLike]);

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