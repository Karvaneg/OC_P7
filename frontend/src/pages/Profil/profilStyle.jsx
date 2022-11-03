import styled from 'styled-components'
import colors from '../../utils/style/colors'

export const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    margin-bottom: 20px;
    margin-top: 20px;
    border-top: 1px solid #ECECEE;
    padding-top: 30px;
    
`

export const StyledPublicationsProfil = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%;
    border-left: 1px solid #ECECEE;

`

export const StyledInformationsProfil = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 80%

`

export const StyledDivImageProfil = styled.div`
    align-self: center;
    margin-bottom: 20px;

`

export const StyledImageProfil = styled.img`
  height: 130px;
  width: 130px;
  border-radius: 50%;
  //border: 1px solid ${colors.tertiary};
  box-shadow: 1px 1px 15px #ECECEE;
  
`



export const StyledProfilInformation = styled.div`
  color : ${colors.tertiary};
  
`
export const StyledFirstnameLastname = styled.div`
margin-top: 20px;
//border: 1px solid ${colors.tertiary};
padding: 10px;
background-color: #ECECEE;
border-radius: 5px;
  
`

export const StyledEmail = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  //border: 1px solid ${colors.tertiary};
  padding: 10px;
  background-color: #ECECEE;
  border-radius: 5px;
  
`


export const ConnectionForm = styled.div`
background: linear-gradient(157deg, rgba(255,215,215,1) 30%, rgba(253,45,1,1) 84%, rgba(78,81,102,1) 100%);
max-width: 350px;
width: 80%;
margin-top: 20px;
display: flex;
flex-direction: column;
justify-content: space-evenly;
padding: 20px;
//margin-top: 20px;
border-radius: 5px;
box-shadow: 1px 1px 15px ${colors.tertiary};
& form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  & input {
    border-radius: 25px;
    border: none;
    height: 20px;
    width: 200px;
    margin: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  & input[type=submit]{
    cursor: pointer;
    width: 180px;
    height: 40px;
    align-items: center;
    font-weight: bold;
    font-size: 15px;
    color: ${colors.primary};
    box-shadow: 0px 6px 10px ${colors.tertiary};
    transition: transform 110ms ease-in-out;
  &:hover{
    box-shadow: 0px 3px 10px ${colors.tertiary};
    transform: translate(0px,1px); 
  }
}
  
`
// Bloc Icônes "Modifier/Supprimer" d'un Post
export const StyledIconesProfil = styled.div`
        display: flex;

`



// Bloc contenant tous les posts du Tableau de bord
export const StyledContenairPosts = styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
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
        width: 80%;
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
        width: 35%;
`
// Image du Post
export const StyledImagePost = styled.img`
        height: 150px;
        width: 100%;
        align-self: center;
        vertical-align: middle;
        object-fit: contain;
`
// Bloc contenu du Post
export const StyledContenuPost = styled.div`
            width: 100%;
            padding-bottom: 13px;
            padding-right: 7px;
            
`
// Bloc Description du Post
export const StyledDescriptionPost = styled.div`
        text-align : justify;
        padding: 10px;
        border-left: solid 1px #DADBDE;
        min-height: 90px;
        max-height: 150px;
        text-overflow: ellipsis;
        overflow: auto;
        
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


