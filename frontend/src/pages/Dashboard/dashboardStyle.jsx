import styled  from 'styled-components'
import colors from '../../utils/style/colors'

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

// Bloc contenant tous les posts du Tableau de bord
export const StyledContenairPosts = styled.div`
        display: flex;
        flex-direction: column;
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
display: flex;
align-items: center;
`
export const StyledDivNoAuthor = styled.div`
        width: 25%;

`

export const StyledImageProfil = styled.img`
        width: 30px;
        border-radius: 50px;
        margin-right: 5px;
`

// Titre du Post
export const StyledTitlePost = styled.div`
        font-size: 18px;
        text-align: center;
`

// Bloc Icônes "Modifier/Supprimer" d'un Post
export const StyledIconesPost = styled.div`
        display: flex;
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
      //  text-align : justify;
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
