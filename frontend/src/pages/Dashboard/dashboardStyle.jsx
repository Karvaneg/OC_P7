import styled  from 'styled-components'
import colors from '../../utils/style/colors'

export const StyledDashboard = styled.div`

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

    @media screen and (max-width: 768px) {
        width: 90%;     
    }
`

// Bloc contenant tous les posts du Tableau de bord
export const StyledContenairPosts = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

// Bloc Post
export const StyledCardPost = styled.div`
    border: 1px solid ${colors.borderColor};
    box-shadow: 1px 1px 15px ${colors.tertiary};
    color: ${colors.tertiary};
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    width: 60%;

    @media screen and (max-width: 768px) {
        width: 90%;     
    }
`

// Header du bloc Post
export const StyledHeaderContenairPost = styled.div`
    border-bottom: 1px solid ${colors.borderColor};
    background-color: ${colors.yellowishGray};
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
        
    @media screen and (max-width: 480px) {
        display: flex;
        flex-direction: column;
        padding-left: 0px;
        padding-right: 0px;   
    }
`

// Auteur du Post
export const StyledAuthorPost = styled.div`
    display: flex;
    align-items: center;

    @media screen and (max-width: 480px) {
        justify-content: center; 
    }
`
export const StyledDivNoAuthor = styled.div`
    width: 25%;
    height: 30px;

    @media screen and (max-width: 480px) {
        width: 100%;      
    }
`

export const StyledImageProfil = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50px;
    margin-right: 5px;
`

// Titre du Post
export const StyledTitlePost = styled.div`
    font-size: 18px;
    text-align: center;

    @media screen and (max-width: 480px) {
        border-top: solid 1px ${colors.borderColor};
        padding-top: 10px;
        padding-bottom: 10px;
        margin-top: 8px;
        width: 100%;    
    }
`

// Bloc Icônes "Modifier/Supprimer" d'un Post
export const StyledIconesPost = styled.div`
    display: flex;
        
    @media screen and (max-width: 480px) {
        margin-bottom: -9px;
        width: 100%;
        display: flex;
        justify-content: space-between;    
    }
`

// Body du bloc Post
export const StyledBodyContenairPost = styled.div`
    display: flex;
    background-color: ${colors.white};
    align-items: center;
        
    @media screen and (max-width: 480px) {
        display: flex;
        flex-direction: column-reverse;      
    }
`

// Bloc image du body du Post
export const StyledDivImagePost = styled.div`
      
`
// Image du Post
export const StyledImagePost = styled.img`
    height: 130px;
    width: 200px;
    align-self: center;
    vertical-align: middle;
    object-fit: contain;
`
// Bloc contenu du Post
export const StyledContenuPost = styled.div`
    width: 100%;
`
// Bloc Description du Post
export const StyledDescriptionPost = styled.div`
    padding: 20px;
    border-left: solid 1px ${colors.borderColor};
    min-height: 90px;
    white-space: break-spaces;
    
    @media screen and (max-width: 480px) {
        border-bottom: solid 1px ${colors.borderColor};
        border-left: none;     
    }  
`
//Footer du bloc Post
export const StyledFooterContenairPost = styled.div`
    border-top: 1px solid ${colors.borderColor};
    background-color: ${colors.lightGray};
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
`
// Bloc date de publication du Post
export const StyledPublishedDate = styled.div`

`
