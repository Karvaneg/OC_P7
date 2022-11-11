import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'


export const StyledModal = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
            & button.modal-toggle {
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

export const StyledFormGroup = styled.div`
        margin-top: 10px;
            & input[type="text"], input[type="password"], input[type="email"], textarea {
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

export const StyledLink = styled(Link)`
        padding: 10px 15px;
        color: ${colors.white};
        text-decoration: none;
        font-size: 15px;
        text-align: center;

`
export const StyledEyePassword = styled.img`
        cursor: pointer;
        height: 25px;
        width: 25px;
        bottom: 30px;
        left: 90%;
        position: relative;
        opacity: 0.6;
`

export const StyledInfosPassword = styled.div`
        font-size: 12px;
        text-align: center;
        color: ${colors.tertiary};
`

export const StyledIsConnectSignupText = styled.div`
        text-align: center;
        color: ${colors.black};
        font-size: 14px;
        margin-top: -18px;
`

