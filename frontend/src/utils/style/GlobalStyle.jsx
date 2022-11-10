import { createGlobalStyle } from 'styled-components'
import colors from './colors'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Lato', Helvetica, sans-serif;
        // margin: 0;
        // padding: 0;
        // box-sizing: border-box;     
    }
    body {
        background-color: #ECECEE;
      //  font-size: 100%;
    }
    h1{
        text-align: center;
        color: ${colors.tertiary};
        margin-top: 40px;
    }
    h2{
        color: ${colors.tertiary};
    }
    
   //  p {font-size: 1.5em;}

// @media screen and (max-width: 64em) {
//  body {
//       font-size: 90%;
//    }
// }

// @media screen and (max-width: 50em) {
//  body {
//        font-size: 75%;
//    }
// }

// @media screen and (max-width: 30em) {
//    body {
//         font-size: 50%;
//   }
// }

`
export default StyledGlobalStyle