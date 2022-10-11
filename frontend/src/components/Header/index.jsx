import { Link } from 'react-router-dom'
import styled from 'styled-components'
//import { StyledLink } from '../../utils/style/Atoms'
//import LightLogo from '../../assets/light-logo.png'
import ColorLogo from '../../assets/white-logo.png'
import colors from '../../utils/style/colors'
//import { useTheme } from '../../utils/hooks'

const HomeLogo = styled.img`
  max-height: 70px;
  width: 100%;
`

const NavContainer = styled.nav`
  padding: 30px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  background-color: ${colors.tertiary};
  border-radius: 20px 20px 90px 90px;
  box-shadow: 2px 2px 10px ${colors.tertiary};
`

const StyledLink = styled(Link)`
padding: 10px 15px;
color: white;
text-decoration: none;
  font-size: 18px;
  text-align: center;


`

function Header() {
    //const { theme } = useTheme()
    return (
        <NavContainer>
            <Link to="/">
            <HomeLogo alt="logo groupomania" src={ColorLogo} />
            </Link>
            <div>
        <StyledLink to="/">
          Connexion
        </StyledLink>
        <StyledLink to="/inscription">
          Inscription
        </StyledLink>
      </div>
    </NavContainer>
  )
}

export default Header