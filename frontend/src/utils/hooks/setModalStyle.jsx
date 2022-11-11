import styled from 'styled-components'
import colors from '../style/colors'

export const StyledModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1040;
    background-color: rgba(0, 0, 0, 0.5);
`

export const StyledModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1050;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    outline: 0;
    display: flex;
    align-items: center;
`

export const StyledModal = styled.div`
    z-index: 100;
    background: ${colors.white};
    position: relative;
    margin: auto;
    border-radius: 5px;
    max-width: 500px;
    width: 80%;
    padding: 1rem;
`

export const StyledModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const StyledModalBody = styled.div`


`

export const StyledModalCloseButton = styled.div`
    font-size: 1.4rem;
    font-weight: 700;
    color: ${colors.black};
    cursor: pointer;
    border: none;
    background: transparent;
`