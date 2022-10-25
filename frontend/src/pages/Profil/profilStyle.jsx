import styled /*, { keyframes }*/ from 'styled-components'
import colors from '../../utils/style/colors'

export const StyledContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-bottom: 20px;
margin-top: 20px;

`

export const StyledDivImageProfil = styled.div`
    align-self: center;
    margin-bottom: 20px;

`

export const StyledImageProfil = styled.img`
  height: 130px;
  width: 130px;
  
`



export const StyledProfilInformation = styled.div`
  color : ${colors.tertiary};
  
`
export const StyledFirstnameLastname = styled.div`
margin-top: 20px;
border: 1px solid ${colors.tertiary};
padding: 10px;
background-color: ${colors.secondary};
border-radius: 5px;
  
`

export const StyledEmail = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  border: 1px solid ${colors.tertiary};
  padding: 10px;
  background-color: ${colors.secondary};
  border-radius: 5px;
  
`


export const ConnectionForm = styled.div`
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
    color: ${colors.primary};
    box-shadow: 0px 6px 10px ${colors.tertiary};
    transition: transform 110ms ease-in-out;
  &:hover{
    box-shadow: 0px 3px 10px ${colors.tertiary};
    transform: translate(0px,1px); 
  }
}
  
`
// Bloc Icônes "Modifier/Supprimer" d'un Post
export const StyledIconesProfil = styled.div`
        display: flex;

`

// Bloc "Modifier" du Profil
export const StyledDivIconeModifyProfil = styled.div`
        width:35px;
        height:35px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50px;
        border: solid 1px ${colors.tertiary};
        background-color: ${colors.secondary};
            &:hover{
                background-color: white;
                border-radius: 50px;
                border: solid 1px #DADBDE;
                width:35px;
                height:35px;
            }
`
// Icône "Modifier" ddu Profil
export const StyledIconeModifyProfil = styled.img`
        width: 20px;
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
        border: solid 1px ${colors.tertiary};
        background-color: ${colors.secondary};
        border-radius: 50px;
            &:hover{
                background-color: white;
                border-radius: 50px;
                border: solid 1px #DADBDE;
                width:35px;
                height:35px;
            }
`
// Icône "Supprimer" d'un Post
export const StyledIconeDeleteProfil = styled.img`
        width: 20px;
`



