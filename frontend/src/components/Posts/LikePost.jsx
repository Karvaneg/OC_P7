import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../utils/context/DataUserConnectedContext';
import liked from '../../assets/like_hover.png'
import unliked from '../../assets/like.png'
import { StyledImageLike, StyledLike } from './likePostStyle';


function LikePost({ data, setData, numberLike, usersliked, idPost }) {

    // [1] state (état, données)
    // On récupère les données de l'utilisateur connecté, grâce au Context
    const {user, setUser} = useContext(UserContext);
    // On récupère le token dans le localstorage
    const isToken = localStorage.getItem("token");
    const [isLiked, setIsLiked] = useState(false);
    const [newUsersLiked, setNewUsersLiked] = useState(usersliked);

    // [2] comportements
    function onLike(event){
        // On empêche le rechargement de la page
        event.preventDefault();
      
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
            
            // Call API
            fetch(`http://localhost:8000/api/posts/${idPost}/like`, dataMethod)
                .then((response) => {
                    console.log(response.status);
                    return response.json();
                })
                .then((res) => {
                    // On incrémente le nombre de like
                    const newNumberLike = (numberLike + res.like);
                    // On récupère du backend le userId de l'utilisateur qui vient de liker
                    const addUserIdLiked = res.userId;
                    // On fusionne le tableau des userId des utilisateurs qui ont déjà liké le post avec le userId de l'utilisateur...
                    //... qui vient de liker le post
                    const newListUsersLiked = newUsersLiked.concat(addUserIdLiked);
                    // On génère une nouvelle liste de posts en mettant à jour le post qui vient d'être liké
                    const newPostList = data.map(post => post._id !== idPost ? post: {...post, likes: newNumberLike, usersLiked: newListUsersLiked});
                    setData(newPostList);
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

                // Call API
                fetch(`http://localhost:8000/api/posts/${idPost}/like`, dataMethod)
                    .then((response) => {
                        console.log(response.status);
                        return response.json();
                      })
                    .then((res) => {
                        // On décrémente le nombre de like
                        const newNumberLike = (numberLike - 1);
                        // On garde tous les utilisateurs qui ont liké sauf celui qui vient de disliker      
                        const filteredUsersliked = usersliked.filter((id) => id !== user._id);
                        // On génère une nouvelle liste de posts en mettant à jour le post qui vient d'être disliké 
                        const newPostList = data.map(post => post._id !== idPost ? post: {...post, likes: newNumberLike, usersLiked: filteredUsersliked});
                        setData(newPostList);
                    })
                    .catch((err) => {
                        console.log("Erreur de dislike", err);
                        alert ("Un problème a été rencontré lors du dislike du post." +idPost);
                    });
        }
    }

    // Gestion de la couleur du pouce selon qu'il est liké ou pas par l'utilisateur connecté
    useEffect(() => {
        // si l'utilisateur n'est pas dans la base de données (dans le tableau des utilisateurs qui ont déjà liké le post)
        if (usersliked.indexOf(user._id) === -1) {
            // le pouce s'affiche en gris
            setIsLiked(false);
        // sinon
        } else {
            // le pouce s'affiche en rouge
            setIsLiked(true);
        };
    }, [user._id, usersliked, isLiked, setIsLiked, newUsersLiked]);

    // [3] affichage (render et rerender)
    return (
        <div>
            { isLiked && (
                <StyledLike>{numberLike} like(s)<StyledImageLike src={liked} onClick={onLike} alt="postLiked" title="Ne plus aimer" /></StyledLike>
            )}
            { !isLiked && (
                <StyledLike>{numberLike} like(s)<StyledImageLike src={unliked} onClick={onLike} alt="postUnliked" title="Aimer" /></StyledLike> 
            )}
        </div>
    )
}
export default LikePost;