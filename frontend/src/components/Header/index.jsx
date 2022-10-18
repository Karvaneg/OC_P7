
import { Link } from 'react-router-dom'
//import { StyledLink } from '../../utils/style/Atoms'
//import LightLogo from '../../assets/light-logo.png'
import ColorLogo from '../../assets/white-logo.png'
import { NavContainer, StyledLink, HomeLogo } from '../../utils/style/theme/header'


//import { useTheme } from '../../utils/hooks'
//import { useState } from 'react'
import React from "react"





function Header() {

    // [1] state (état, données)
    const isToken = localStorage.getItem("token");
  //  const [isProfil, setIsProfil] = useState(false);
   // const [isDashboard, setIsDashboard] = useState(false);
   //const isInfoUser = JSON.parse(localStorage.getItem("testObject"));
   //const isToken = isInfoUser.token;

  // const isToken = (JSON.parse(localStorage.getItem("testObject"))).token;

    // [2] comportements
    const deleteToken  = () => { 
        localStorage.clear();
        document.location.href = `/`;
    }

    // const changeLink = () => {
    //     setIsProfil(true);
    //     setIsDashboard(true);
    // }
    //const { theme } = useTheme()


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
                        <StyledLink to="/">
                            Connexion
                        </StyledLink>
                        <StyledLink to="/inscription">
                            Inscription
                        </StyledLink>
                    </div>
                )}  
            </div>
        </NavContainer>
    )
}

export default Header