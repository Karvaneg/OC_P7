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