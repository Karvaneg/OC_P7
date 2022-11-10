import profile from '../../assets/defaultImageProfile.png'
import { StyledIsConnectSignupText, StyledProfileImageDefaut, StyledEyePassword, StyledContainer, 
  StyledConnectionForm, StyledInfosPassword } from './connexionStyle'
import { DocumentTitle } from "../../utils/hooks/setDocumentTitle" 
import { useDocumentTitle } from "../../utils/hooks/setDocumentTitle"
import redEye from '../../assets/red_eye.png'
import greenEye from '../../assets/green_eye.png'
import { useState } from "react"
import React from "react"
import Signup from '../../components/Inscription/Signup'

function Connexion() {
  useDocumentTitle(`${DocumentTitle.connexion}`);
  
  // [1] state (état, données)

    // State affichage, masquage mot de passe
     const [ colorEye, setColorEye ] = useState(redEye);
     const [ typePassword, setTypePassword ] = useState("password");
     const [ titleColorEye, setTitleColorEye ] = useState("afficher");
     const [ e, setE ] = useState(true);

    // State input email et password
    const [email, setEmail] = useState("👤Email ");
    const [password, setPassword] = useState("🔐️ Mot de passe");
    const [isConnect, setIsConnect] = useState(false);
    
  // [2] comportements
    // du champ email
    const emailHandleChange = (event) => {
      if(email.length <= 1){
        setEmail("👤Email ");
      } else {
        setEmail(event.target.value);
      }
    };
  
    //du champ mot de passe
    const passwordHandleChange = (event) => {
      if(password.length <= 1){
        setPassword("🔐️ Mot de passe");
      } else {
        setPassword(event.target.value);
      }
    };
  
  // Fonction connexion
  const handleSubmit = (event) => {
      event.preventDefault();
      // On récupère l'email et le mot de passe renseignés par l'utilisateur
      const userEmail = email;
      const userPassword = password;
      
      // On cré un objet dans lequel on met les infos "user"
      const dataUser = {
            email: userEmail,
            password: userPassword,
      }
      // On indique la méthode d'envoi des données
      const dataMethod = {
        method: 'POST',
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dataUser)
      };
      // Call API pour la connexion
      fetch("http://localhost:8000/api/auth/login", dataMethod)
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          setIsConnect(false);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userIdConnected", data.userId);
          localStorage.setItem("dateConnection", Date.now());
          document.location.href = `/dashboard`;
        } else {
          setIsConnect(true);
          // Votre adresse email ou votre mot de passe est incorrect. Veuillez vérifier les informations saisies.
        }
        })

      .catch((err) => {
          console.log("Erreur Fetch", err);
          alert ("Un problème a été rencontré lors de l'envoi du formulaire.");
      });
    }      

    // de l'icône oeil
    
    const showHidePassword = () => {
      if(e === true) {
        setTypePassword("text");
        setColorEye(greenEye);
        setE(false);
        setTitleColorEye("masquer");
      } else {
        setTypePassword("password")
        setColorEye(redEye);
        setE(true);
        setTitleColorEye("afficher");
      }
    };

  // [3] affichage (render et rerender)
  return (
      <StyledContainer>
        <h1>
          Bienvenue sur le réseau social interne de votre entreprise !
        </h1>
        <StyledConnectionForm>
          <StyledProfileImageDefaut src={profile} alt="profileImageDefaut" />
          <form onSubmit={handleSubmit}>
            <div>
              <input aria-label="Email" type="email"  onChange={emailHandleChange} name="email" placeholder={email} /*title="Votre email"*/ required />
            </div>
            <StyledInfosPassword>8 caractères minimum - minuscules & majuscules - 2 chiffres minimum</StyledInfosPassword>
            <div>
              <input aria-label="Mot de passe" type={typePassword} onChange={passwordHandleChange} name="password" placeholder={password} /*title="Votre mot de passe"*/ autoComplete="true"  required />
              <StyledEyePassword src={colorEye} alt="eye" onClick={showHidePassword} title={titleColorEye} />
            </div>
            { isConnect ? (
            <StyledIsConnectSignupText>
              <p>Votre adresse email ou votre mot de passe est incorrect.</p><p>Veuillez vérifier les informations saisies.</p>
            </StyledIsConnectSignupText>
            ) : (
              <div></div>
            )}
            <div>
              <input type="submit" value="Connexion" />
            </div>
          </form>
          <Signup />
        </StyledConnectionForm>
      </StyledContainer> 
  );
}
export default Connexion;
