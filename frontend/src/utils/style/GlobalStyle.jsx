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
        //background-color: #FFD7D7;
    }
    h1{
        text-align: center;
        color: ${colors.tertiary};
        margin-top: 40px;
    }
    h2{
        color: ${colors.tertiary};
    }

`
export default StyledGlobalStyle