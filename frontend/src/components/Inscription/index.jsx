import {DocumentTitle} from "../../utils/hooks/setDocumentTitle" 
import {useDocumentTitle} from "../../utils/hooks/setDocumentTitle"
//import { TitleH1 } from '../../utils/style/Theme'
import { ProfileImageDefaut } from '../../utils/style/Theme'
import { Container } from '../../utils/style/Theme'
import { IsConnectSignupText } from '../../utils/style/Theme'
import { ConnectionForm } from '../../utils/style/Theme'
import profile from '../../assets/profile.png'
import React from "react"
import redEye from '../../assets/red_eye.png'
import greenEye from '../../assets/green_eye.png'
import { useState } from "react"
import { EyePassword } from '../../utils/style/Theme'

function Inscription() {
    useDocumentTitle(`${DocumentTitle.inscription}`);
    
    // [1] state (état, données)
        // State affichage, masquage mot de passe
        const [ colorEye, setColorEye ] = useState(redEye);
        const [ typePassword, setTypePassword ] = useState("password");
        const [ titleColorEye, setTitleColorEye ] = useState("afficher");
        const [ e, setE ] = useState(true);

        // State input email et password
        const [email, setEmail] = useState("👤Email ");
        const [password, setPassword] = useState("🔐️ Mot de passe");
        const [firstname, setFirstname] = useState("Votre prénom");
        const [lastname, setLastname] = useState("Votre nom");
        const [isSignupError, setIsSignupError] = useState(false);
        const [isSignupValid, setIsSignupValid] = useState(false);
        const [decompte, setDecompte] = useState(5);
      
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

      // du champ firstname
      const firstnameHandleChange = (event) => {
        if(firstname.length <= 1){
            setFirstname("Votre prénom");
        } else { 
            setFirstname(event.target.value);
        }
      };

      
      // du champ lastname
      const lastnameHandleChange = (event) => {
        if(lastname.length <= 1){
            setLastname("Votre nom");
        } else { 
            setLastname(event.target.value);
        }
      };
      
        // du bouton inscription
        const handleSubmit = (event) => {
            event.preventDefault();
            // On récupère l'email, le mot de passe, le nom et le prénom renseignés par l'utilisateur
            const userEmail = email;
                console.log(userEmail);
            const userPassword = password;
                console.log(userPassword);
            const userFirstname = firstname;
                console.log(userFirstname);
            const userLastname = lastname;
                console.log(userLastname);
      
            // On cré un objet dans lequel on met les infos "user"
            const dataUser = {
                email: userEmail,
                password: userPassword,
                firstname: userFirstname,
                lastname: userLastname,
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
                console.log(dataMethod);

                
            // Call API
            fetch("http://localhost:8000/api/auth/signup", dataMethod)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data.email);
                    if(data.email === userEmail) {
                        console.log(data.message);
                        setIsSignupError(true);
                        setIsSignupValid(false);

                        setTimeout(function(){
                           document.location.href = `/`;
                        }, 5000);
                        setInterval(() => setDecompte((decompte) => decompte - 1,), 1000);
                    } else {
                        setIsSignupValid(true);
                        setIsSignupError(false);
                        setTimeout(function(){
                            document.location.href = `/`;
                         }, 5000);
                         setInterval(() => setDecompte((decompte) => decompte - 1,), 1000);
                    }
                })
                .catch((err) => {
                    console.log("Erreur Fetch", err);
                    alert ("Un problème a été rencontré lors de l'envoi du formulaire.");
                });
        };
        
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
    <Container>
      <h1>
        Pas encore inscrit ? N'attendez plus, rejoignez vos collègues !
      </h1>
      <ConnectionForm>
      
        <ProfileImageDefaut src={profile} alt="profileImageDefaut" />
      
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" onChange={emailHandleChange} name="email" placeholder={email} title="Votre email" required />
            <input type={typePassword} onChange={passwordHandleChange} name="password" placeholder={password} title="Votre mot de passe" autoComplete="true" required />
            <EyePassword src={colorEye} alt="eye" onClick={showHidePassword} title={titleColorEye} />
          </div>
          { isSignupError ? (
          <IsConnectSignupText>
            L'utilisateur {email} est déjà inscrit ! Vous allez être redirigé vers la page de connexion dans {decompte} secondes.
          </IsConnectSignupText>
          ) : (
            null
          )}
           { isSignupValid ? (
          <IsConnectSignupText>
          Votre inscription a bien été prise en compte ! Vous allez être redirigé vers la page de connexion dans {decompte} secondes.
            </IsConnectSignupText>
          ) : (
            null
          )}
          <div>
            <input type="text" onChange={firstnameHandleChange} name="firstname" placeholder={firstname} title="Votre prénom"  required />
            <input type="text" onChange={lastnameHandleChange} name="lastname" placeholder={lastname} title="Votre nom"  required />
          </div>
          <div>
            <input type="submit" value="Inscription" />
          </div>
        </form>
        
        </ConnectionForm>
    </Container>
    
  );
}
  
  export default Inscription;