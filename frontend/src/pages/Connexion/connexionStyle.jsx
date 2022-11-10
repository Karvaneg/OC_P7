import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/style/colors'


export const StyledProfileImageDefaut = styled.img`
  height: 130px;
  width: 130px;
  align-self: center;
`
export const StyledEyePassword = styled.img`
  cursor: pointer;
  height: 25px;
  width: 25px;
  bottom: 42px;
  left: 191px;
  position: relative;
  opacity: 0.6;
`
export const StyledInfosPassword = styled.div`
        font-size: 12px;
        width: 200px;
        text-align: center;
        color: white;

`

export const StyledContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px;
margin-top: 20px;

`

export const StyledConnectionForm = styled.div`
background: linear-gradient(157deg, rgba(255,215,215,1) 30%, rgba(253,45,1,1) 84%, rgba(78,81,102,1) 100%);
max-width: 500px;
width: 80%;
margin: auto;
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
    color: ${colors.tertiary};
    box-shadow: 0px 6px 10px ${colors.tertiary};
    transition: transform 110ms ease-in-out;
  &:hover{
    box-shadow: 0px 3px 10px ${colors.tertiary};
    transform: translate(0px,1px); 
  }
}
  
`
export const StyledIsConnectSignupText = styled.div`
    text-align: center;
    color: white;
    font-size: 14px;
    margin-top: -18px;

`

export const StyledLink = styled(Link)`
    padding: 10px 15px;
    color: ${colors.white};
    text-decoration: none;
    font-size: 15px;
    text-align: center;

`