import styled  from 'styled-components'

// Bloc Like du Post
export const StyledLike = styled.div`
        display: flex;
        align-items: center;

        @media screen and (max-width: 768px) {
            width: 72px;   
        }
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