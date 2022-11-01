import { Link } from 'react-router-dom'
import ColorLogo from '../../assets/white-logo.png'
import { NavContainer, StyledLink, HomeLogo } from './headerStyle'
import React from "react"

function Header() {

    // [1] state (état, données)
    const isToken = localStorage.getItem("token");

    // [2] comportements
    const deleteToken  = () => { 
        localStorage.clear();
        document.location.href = `/`;
    }

    // [3] affichage (render et rerender)
    return (
        <NavContainer>
            <Link to="/">
                <HomeLogo alt="logo groupomania" src={ColorLogo} />
            </Link>
            <div>
                { isToken ? (
                    <div>
                        <StyledLink to="/dashboard" >
                            Tableau de bord
                        </StyledLink>
                        <StyledLink to="/profil" >
                            Mon Profil
                        </StyledLink>
                        <StyledLink onClick={deleteToken}>
                            Déconnexion
                        </StyledLink>
                    </div>
                ) : (
                    <div>
                        
                    </div>
                )}  
            </div>
        </NavContainer>
    )
}
export default Header