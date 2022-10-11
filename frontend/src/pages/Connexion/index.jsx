import profile from '../../assets/profile.png'
import { StyledLink } from '../../utils/style/Theme'
import { TitleH1 } from '../../utils/style/Theme'
import { IsConnectText } from '../../utils/style/Theme'
import { ProfileImageDefaut } from '../../utils/style/Theme'
import { EyePassword } from '../../utils/style/Theme'
import { Container } from '../../utils/style/Theme'
import { ConnectionForm } from '../../utils/style/Theme'
import React from "react"
import { DocumentTitle } from "../../utils/hooks/setDocumentTitle" 
import { useDocumentTitle } from "../../utils/hooks/setDocumentTitle"
import redEye from '../../assets/red_eye.png'
import greenEye from '../../assets/green_eye.png'
import { useState } from "react"



function Connexion() {
  useDocumentTitle(`${DocumentTitle.connexion}`);
  // state (état, données)
    // State affichage, masquage mot de passe
    const [ colorEye, setColorEye ] = useState(redEye);
    const [ typePassword, setTypePassword ] = useState("password");
    const [ titleColorEye, setTitleColorEye ] = useState("afficher");
    const [ e, setE ] = useState(true);

    // State input email et password
    const [email, setEmail] = useState("👤Email ");
    const [password, setPassword] = useState("🔐️ Mot de passe");
    const [isConnect, setIsConnect] = useState(false);

  // comportements
    // du champ email
    const emailHandleChange = (event) => {
      setEmail(event.target.value);
    }; 
  
    //du champ mot de passe
    const passwordHandleChange = (event) => {
      setPassword(event.target.value);
    };
  
  const handleSubmit = (event) => {
      event.preventDefault();
      // On récupère l'email et le mot de passe renseignés par l'utilisateur
      const userEmail = email;
      console.log(userEmail);
      const userPassword = password;
      console.log(userPassword);
      
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
      // Call API
      fetch("http://localhost:8000/api/auth/login", dataMethod)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);

        if (data.token) {
          console.log(data.token);
          setIsConnect(false);
          // on redirige vers la page de confirmation de commande en passant l'orderId (numéro de commande) dans l'URL
          document.location.href = `/dashboard`;
        } else {
          setIsConnect(true);
          // Votre adresse email ou votre mot de passe est incorrect, veuillez vérifier les informations saisies.
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
  
  
  // affichage (render et rerender)
  return (
    <Container>
      <TitleH1>
        Bienvenue sur le réseau social interne de votre entreprise !
      </TitleH1>
      <ConnectionForm>
        <ProfileImageDefaut src={profile} alt="profileImageDefaut" />
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" /*value={email}*/ onChange={emailHandleChange} name="email" placeholder={email} title="Votre email" required />
          </div>
          <div>
            <input type={typePassword} /*value={password}*/ onChange={passwordHandleChange} name="password" placeholder={password} title="Votre mot de passe" autoComplete="true"  required />
            <EyePassword src={colorEye} alt="eye" onClick={showHidePassword} title={titleColorEye} />
          </div>
          { isConnect ? (
          <IsConnectText>
            Votre adresse email ou votre mot de passe est incorrect. Veuillez vérifier les informations saisies.
          </IsConnectText>
        ) : (
          <div></div>
        )}
          <div></div>
          <div>
            <input type="submit" value="Connexion" />

          </div>
        </form>
        <StyledLink to="/inscription">
          Pas encore inscrit ?
        </StyledLink>
      </ConnectionForm>
    </Container>
  );
}

export default Connexion;
