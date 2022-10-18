import styled, { keyframes } from 'styled-components'
import colors from '../colors'


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  padding: 10px;
  margin-left: auto;
  margin-right: auto;
  border: 6px solid ${colors.secondary};
  border-bottom-color: transparent;
  border-radius: 22px;
  animation: ${rotate} 1s infinite linear;
  height: 10px;
  width: 10px;
`