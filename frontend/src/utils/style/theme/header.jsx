import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../colors'

export const HomeLogo = styled.img`
  max-height: 70px;
  width: 100%;
`

export const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  background-color: ${colors.tertiary};
  border-radius: 20px 20px 90px 90px;
  box-shadow: 2px 2px 10px ${colors.tertiary};
  border: solid 1px #ECECEE;
`

export const StyledLink = styled(Link)`
padding: 10px 15px;
color: white;
text-decoration: none;
  font-size: 18px;
  text-align: center;
  &:hover{
    text-decoration: underline;
  }
`