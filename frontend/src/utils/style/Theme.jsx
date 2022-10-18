import { Link } from 'react-router-dom'
import styled /*, { keyframes }*/ from 'styled-components'
import colors from './colors'



// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `

// export const Loader = styled.div`
//   padding: 10px;
//   margin-left: auto;
//   margin-right: auto;
//   border: 6px solid ${colors.secondary};
//   border-bottom-color: transparent;
//   border-radius: 22px;
//   animation: ${rotate} 1s infinite linear;
//   height: 10px;
//   width: 10px;
// `

// export const TitleH1 = styled.h1`
// text-align: center;
// color: ${colors.tertiary};

// `

export const ProfileImageDefaut = styled.img`
  height: 130px;
  width: 130px;
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
export const IsConnectSignupText = styled.div`
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
export const HeaderDashBoard = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    margin-bottom: -16px;

`

export const ContenairPosts = styled.div`
display: flex;
flex-direction: column-reverse;


`
export const CardPost = styled.div`

//border-radius: 20px 20px 0px 0px;
border: 1px solid #DADBDE;
//border: 1px solid ${colors.tertiary};
box-shadow: 1px 1px 15px ${colors.tertiary};
color: #4E5166;
margin-top: 20px;
margin-bottom: 20px;
margin-left: auto;
margin-right: auto;
width: 60%;

`


export const HeaderContenairPost = styled.div`
border-bottom: 1px solid #DADBDE;
background-color: #ECECEE;
//color: ${colors.white};
padding: 10px;
//border-radius: 20px 20px 0px 0px;
display: flex;
justify-content: space-between;
align-items: center;
font-size: 12px;

`

export const TitlePost = styled.div`

font-size: 18px;



`

export const ImagePost = styled.div`
margin-left: 20px;
margin-right: 20px;


`
export const ContenuPost = styled.div`



`
export const DescriptionPost = styled.div`
text-align : justify;
padding: 20px;
border-left: solid 1px #DADBDE;


`


export const AuthorPost = styled.div`



`
export const BodyContenairPost = styled.div`
display: flex;
background-color: ${colors.white};
align-items: center;



`
export const FooterContenairPost = styled.div`
border-top: 1px solid #DADBDE;
background-color: #F0F2F5;
padding: 10px;
//border-radius: 0px 0px 90px 90px;
display: flex;
justify-content: space-between;
align-items: center;
font-size: 12px;
//color: ${colors.white};


`
export const ImageModifyPost = styled.img`
width: 20px;
//margin: 8px;
// padding: 5px;
// &:hover{
//     background-color: white;
//     border-radius: 50px;
//     margin: 8px;
//     padding: 0;
// }



`
export const ImageDeletePost = styled.img`
width: 20px;

// padding: 8px;
// &:hover{
//     background-color: white;
//     border-radius: 50px;
//     //padding: 8px;
//     width: 30px;
//     height: 30px;
//     padding: 0;

//  }


`
export const IconesPost = styled.div`
display: flex;

` 
export const IconesModify = styled.div`
width:35px;
    height:35px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    border: solid 1px #ECECEE;
&:hover{
    background-color: white;
    border-radius: 50px;
    border: solid 1px #DADBDE;
    width:35px;
    height:35px;
}

`

export const IconesDelete = styled.div`
    width:35px;
    height:35px;
    margin-left: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px #ECECEE;
    border-radius: 50px;
&:hover{
    background-color: white;
    border-radius: 50px;
    border: solid 1px #DADBDE;
    width:35px;
    height:35px;
}

`


export const PublishedDate = styled.div`



`
export const Like = styled.div`
display: flex;
align-items: center;



`
export const ImageLike = styled.img`
width: 20px;
margin-left: 10px;
transition: transform 110ms ease-in-out;
&:hover{
    transform: translate(0px,1px); 
  }


`