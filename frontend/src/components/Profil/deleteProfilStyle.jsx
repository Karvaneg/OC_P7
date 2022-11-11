import styled  from 'styled-components'
import colors from '../../utils/style/colors'

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
