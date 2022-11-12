import styled from 'styled-components'
import colors from '../../utils/style/colors'

export const StyledProfil = styled.div`
        margin-left: 20px;
        margin-right: 20px;

        @media screen and (max-width: 480px) {
            margin-left: 0px;
            margin-right: 0px;   
        }
`

//************************************************************//
//****** Mise en forme de la partie "Mes informations" ******//
//**********************************************************//

export const StyledContainer = styled.div`
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        margin: 20px;
        border-top: 1px solid ${colors.yellowishGray};
        padding-top: 30px;
        justify-content: space-around;

        @media screen and (max-width: 980px) {
            flex-direction: column;
            align-items: center;       
        }
`

export const StyledInformationsProfil = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;

        @media screen and (max-width: 980px) {
            margin-bottom: 40px;
            width: 100%;   
        }
`

export const ConnectionForm = styled.div`
        background: linear-gradient(157deg, rgba(255,215,215,1) 30%, rgba(253,45,1,1) 84%, rgba(78,81,102,1) 100%);
        width: 300px;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 1px 1px 15px ${colors.tertiary};

        @media screen and (max-width: 480px) {
            width: 90%;  
        }
`

export const StyledDivImageProfil = styled.div`
        align-self: center;
        margin-bottom: 20px;
`

export const StyledImageProfil = styled.img`
        height: 130px;
        width: 130px;
        border-radius: 50%;
        box-shadow: 1px 1px 15px ${colors.yellowishGray};
`

// Bloc Icônes "Modifier/Supprimer" du profil
export const StyledIconesProfil = styled.div`
        display: flex;
`

export const StyledProfilInformation = styled.div`
        color : ${colors.tertiary};
`
export const StyledFirstnameLastname = styled.div`
        margin-top: 20px;
        padding: 10px;
        background-color: ${colors.yellowishGray};
        border-radius: 5px;
`

export const StyledEmail = styled.div`
        margin-top: 20px;
        margin-bottom: 20px;
        padding: 10px;
        background-color: ${colors.yellowishGray};
        border-radius: 5px;
`

//************************************************************//
//****** Mise en forme de la partie "Mes publications" ******//
//**********************************************************//

export const StyledPublicationsProfil = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 60%;

        @media screen and (max-width: 980px) {
            width: 100%;       
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
        width: 100%;
      
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

export const StyledImageProfilPost = styled.img`
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



