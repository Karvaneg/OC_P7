import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'

export const StyledHeader = styled.div`
    text-align: center;

    @media screen and (max-width: 980px) {
        display: flex;
        flex-direction: column;
    }
`

export const NavContainer = styled.nav`
    padding: 30px;
    width: auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    background-color: ${colors.tertiary};
    border-radius: 20px 20px 90px 90px;
    box-shadow: 2px 2px 10px ${colors.tertiary};
    border: solid 1px #ECECEE;

    @media screen and (max-width: 980px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 10px;
    }

    @media screen and (max-width: 480px) {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        padding: 10px;
    }
`

export const HomeLogo = styled.img`
    max-height: 70px;
    object-fit: contain;

    @media screen and (max-width: 480px) {
        width: 80%;
        margin-left: -30px;
    }
`

export const StyledNav = styled.div`
    @media screen and (max-width: 480px) {
        width: 204px;
        margin-right: 12px;
    }
`

export const StyledLink = styled(Link)`
    padding: 10px 15px;
    color: ${colors.white};
    text-decoration: none;
    font-size: 18px;
    text-align: center;
        &:hover{
            text-decoration: underline;
        }
    @media screen and (max-width: 480px) {
        display: flex;
        flex-direction: column;
        padding: 5px 10px;
        font-size: 12px;  
    }
`