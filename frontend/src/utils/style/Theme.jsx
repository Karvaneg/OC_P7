import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import colors from './colors'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  padding: 10px;
  border: 6px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
`

export const TitleH1 = styled.h1`
text-align: center;
color: ${colors.tertiary};

`

export const ProfileImageDefaut = styled.img`
  height: 140px;
  width: 140px;
  align-self: center;
`
export const EyePassword = styled.img`
  cursor: pointer;
  height: 25px;
  width: 25px;
  bottom: 42px;
  left: 191px;
  position: relative;
  opacity: 0.6;
`

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px;
margin-top: 20px;

`

export const ConnectionForm = styled.div`
background: linear-gradient(157deg, rgba(255,215,215,1) 30%, rgba(253,45,1,1) 84%, rgba(78,81,102,1) 100%);width: 300px;
width: 300px;
height: auto;
display: flex;
flex-direction: column;
justify-content: space-evenly;
padding: 20px;
margin-top: 20px;
border-radius: 20px 20px 20px 20px;
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
export const IsConnectText = styled.div`
    text-align: center;
    color: ${colors.secondary};
    font-size: 12px;
    margin-top: -18px;
    margin-left: 44px;
    margin-right: 48px;

`

export const StyledLink = styled(Link)`
    padding: 10px 15px;
    color: white;
    text-decoration: none;
    font-size: 15px;
    text-align: center;

`


