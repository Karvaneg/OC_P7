import styled  from 'styled-components'
import colors from '../../utils/style/colors'

export const StyledModal = styled.div`
    
}

`
// Mise en forme des boutons oui et non de la Modal
export const StyledFormGroup = styled.div`
        margin-top: 10px;
            & button.modal-toggle {
                background-color: ${colors.secondary};
                cursor: pointer;
                padding: 10px 15px;
                text-transform: uppercase;
                border: none;
                margin-right: 10px;
                margin-top: 10px;
            }
`

// Bloc "Supprimer" d'un Post
export const StyledDivIconeDeleteProfil = styled.div`
        width:35px;
        height:35px;
        margin-left: 10px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 1px ${colors.yellowishGray};
        background-color: ${colors.yellowishGray};
        border-radius: 50px;
        cursor: pointer;
            &:hover{
                background-color: ${colors.white};
                border-radius: 50px;
                border: solid 1px ${colors.borderColor};
                width:35px;
                height:35px;
            }
`
// Icône "Supprimer" d'un Post
export const StyledIconeDeleteProfil = styled.img`
        width: 20px;
`
