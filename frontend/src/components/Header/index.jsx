import { Link } from 'react-router-dom'
import ColorLogo from '../../assets/white-logo.png'
import { NavContainer, StyledLink, HomeLogo, StyledHeader,StyledNav } from './headerStyle'
import React from "react"

function Header() {

    // [1] state (état, données)
        // On récupère le token stocké dans le localstorage
        const isToken = localStorage.getItem("token");

    // [2] comportements
        // Fonction permettant de vider le localstorage et de rediriger vers la page de connexion quand un utilisateur clique sur "Déconnexion"
        const deleteToken  = () => { 
            localStorage.clear();
            document.location.href = `/`;
        }

    // [3] affichage (render et rerender)
        return (
            <StyledHeader>
                <NavContainer>
                    <Link to="/">
                        <HomeLogo alt="logo groupomania" src={ColorLogo} />
                    </Link>
                    <>
                        { isToken ? (
                            // Si il y a un token dans le localstorage, on affiche le menu
                            <StyledNav>
                                <StyledLink to="/dashboard" >
                                    Tableau de bord
                                </StyledLink>
                                <StyledLink to="/profil" >
                                    Mon Profil
                                </StyledLink>
                                <StyledLink onClick={deleteToken}>
                                    Déconnexion
                                </StyledLink>
                            </StyledNav>
                            // Sinon rien
                            ) : (
                            <></>
                        )}  
                    </>
                </NavContainer>
            </StyledHeader>
        )
    }
export default Header