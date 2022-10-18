import { createGlobalStyle } from 'styled-components'
import colors from './colors'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Lato', Helvetica, sans-serif;
        
    }
    body {
        //background-color: #FFD7D7;
    }
    h1{
        text-align: center;
        color: ${colors.tertiary};
    }
    h2{
        color: ${colors.tertiary};
    }
 
`
export default StyledGlobalStyle