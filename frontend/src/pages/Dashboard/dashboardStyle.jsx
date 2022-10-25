import styled /*, { keyframes }*/ from 'styled-components'
import colors from '../../utils/style/colors'

// Mise en forme de l'entête du tableau de bord (placement du titre et du bouton Ajouter un post)
export const StyledHeaderDashBoard = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;

`
// Mise en forme du bouton Ajouter un post du Tableau de bord et de la Modal pour ajouter un post
export const StyledModal = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        & button.modal-toggle
         {
          background-color: ${colors.secondary};
          cursor: pointer;
          padding: 10px 15px;
          text-transform: uppercase;
          border: none;
        }
        & button.modal-toggle:not(:first-child) {
          margin-left: 10px;
        }
`
// Mise en forme du formulaire de la Modal "Ajouter un post"     
export const StyledFormGroup = styled.div`
        margin-top: 10px;
        & input[type="text"],
        input[type="password"],
        input[type="email"], textarea {
          box-sizing: border-box;
          width: 100%;
          padding: 0.5rem 0.7rem;
        }
        & textarea {
          max-width: 100%;
          height: 132px;
        }
        & input[type="submit"] {
            background-color: ${colors.secondary};
          cursor: pointer;
          padding: 10px 15px;
          text-transform: uppercase;
          border: none;
        }
`
export const StyledTextSpecifiedFormatFile = styled.div`
        font-size: 12px;
        margin-bottom: 4px;
`

// Bloc contenant tous les posts du Tableau de bord
export const StyledContenairPosts = styled.div`
        display: flex;
        flex-direction: column-reverse;
`

// Bloc Post
export const StyledCardPost = styled.div`
        border: 1px solid #DADBDE;
        box-shadow: 1px 1px 15px ${colors.tertiary};
        color: #4E5166;
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: auto;
        margin-right: auto;
        width: 60%;
`

// Header du bloc Post
export const StyledHeaderContenairPost = styled.div`
        border-bottom: 1px solid #DADBDE;
        background-color: #ECECEE;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
`

// Auteur du Post
export const StyledAuthorPost = styled.div`

`
// Titre du Post
export const StyledTitlePost = styled.div`
        font-size: 18px;
`

// Bloc Icônes "Modifier/Supprimer" d'un Post
export const StyledIconesPost = styled.div`
        display: flex;
` 
// Bloc "Modifier" d'un Post
export const StyledDivIconeModifyPost = styled.div`
        width:35px;
        height:35px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        border: solid 1px #ECECEE;
            &:hover{
                background-color: white;
                border-radius: 50px;
                border: solid 1px #DADBDE;
                width:35px;
                height:35px;
            }
`
// Icône "Modifier" d'un Post
export const StyledIconeModifyPost = styled.img`
        width: 20px;
`
// Bloc "Supprimer" d'un Post
export const StyledDivIconeDeletePost = styled.div`
        width:35px;
        height:35px;
        margin-left: 10px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px #ECECEE;
        border-radius: 50px;
            &:hover{
                background-color: white;
                border-radius: 50px;
                border: solid 1px #DADBDE;
                width:35px;
                height:35px;
            }
`
// Icône "Supprimer" d'un Post
export const StyledIconeDeletePost = styled.img`
        width: 20px;
`

// Body du bloc Post
export const StyledBodyContenairPost = styled.div`
        display: flex;
        background-color: ${colors.white};
        align-items: center;
`

// Bloc image du body du Post
export const StyledDivImagePost = styled.div`
        margin-left: 20px;
        margin-right: 20px;
`
// Image du Post
export const StyledImagePost = styled.img`
        height: 130px;
        width: 130px;
        align-self: center;
        vertical-align: middle;
        object-fit: contain;
`
// Bloc contenu du Post
export const StyledContenuPost = styled.div`
            
            

`
// Bloc Description du Post
export const StyledDescriptionPost = styled.div`
        text-align : justify;
        padding: 20px;
        border-left: solid 1px #DADBDE;
        min-height: 90px;
        
`
//Footer du bloc Post
export const StyledFooterContenairPost = styled.div`
        border-top: 1px solid #DADBDE;
        background-color: #F0F2F5;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
`
// Bloc date de publication du Post
export const StyledPublishedDate = styled.div`

`
// Bloc Like du Post
export const StyledLike = styled.div`
        display: flex;
        align-items: center;
`
// Image du Like du Post
export const StyledImageLike = styled.img`
        width: 20px;
        margin-left: 10px;
        transition: transform 110ms ease-in-out;
            &:hover{
                transform: translate(0px,1px); 
            }
`

