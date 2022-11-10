import styled  from 'styled-components'
import colors from '../../utils/style/colors'

// Bloc "Modifier" du Profil
export const StyledDivIconeModifyProfil = styled.div`
        width:35px;
        height:35px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        border: solid 1px #ECECEE;
        background-color: #ECECEE;
        cursor: pointer;
            &:hover{
                background-color: white;
                border-radius: 50px;
                border: solid 1px #DADBDE;
                width:35px;
                height:35px;
            }
`
// Icône "Modifier" du Profil
export const StyledIconeModifyProfil = styled.img`
        width: 20px;
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