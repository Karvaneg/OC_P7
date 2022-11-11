import styled from 'styled-components'
import colors from '../../utils/style/colors'

export const StyledContainerError = styled.div`
        position: relative;
        display: flex;
        justify-content: center;
        margin: auto;
        width: 768px;

        @media screen and (max-width: 768px) {
            width: 320px;
        }
`

export const StyledTextError = styled.div`
        position: absolute;
        width: 410px;
        top: 208px;
        right: 233px;
        font-size: 150%;
        font-weight: bold;
        z-index: 1;
        color: ${colors.tertiary};

        @media screen and (max-width: 768px) {
            top: 66px;
            right: 24px;
            font-size: 60%;
            width: 246px;
        }
`

export const StyledIntrouvable = styled.div`

`

export const Styled404 = styled.div`
        margin-bottom: 20px;
        margin-left: 59px;
        margin-top: 20px;
`

export const StyledImageDivError = styled.div`
        position: absolute;
        margin: auto;

        @media screen and (max-width: 768px) {
            max-width: 320px;
        }
`

export const StyledImageError = styled.img`
        width: 100%;
        margin: auto;
        object-fit: contain;
`