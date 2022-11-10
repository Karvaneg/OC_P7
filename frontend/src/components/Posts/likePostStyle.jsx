import styled  from 'styled-components'
import colors from '../../utils/style/colors'

// Bloc Like du Post
export const StyledLike = styled.div`
        display: flex;
        align-items: center;
`

// Image du Like du Post
export const StyledImageLike = styled.img`
        width: 20px;
        margin-left: 10px;
        transition: transform 110ms ease-in-out;
        cursor: pointer;
            &:hover{
                transform: translate(0px,1px); 
            }
`