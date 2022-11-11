import { createGlobalStyle } from 'styled-components'
import colors from './colors'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Lato', Helvetica, sans-serif;     
    }
    body {
        background-color: ${colors.yellowishGray};
        margin: 0;
    }
    h1 {
        text-align: center;
        color: ${colors.tertiary};
        margin-top: 40px;
    }
    h2 {
        color: ${colors.tertiary};
    }

`
export default StyledGlobalStyle