import React, { useState } from 'react';
import { useModal, Modal } from "../../utils/hooks/setModal";
import { StyledLink, StyledIsConnectSignupText, StyledEyePassword, StyledModal, StyledFormGroup, StyledInfosPassword } from './signupStyle'
import redEye from '../../assets/red_eye.png'
import greenEye from '../../assets/green_eye.png'

function Signup() {
    const { isShowing: isSignup, toggle: toggleRegistrationForm} = useModal();
    
    // State affichage, masquage mot de passe
    const [ colorEye, setColorEye ] = useState(redEye);
    const [ typePassword, setTypePassword ] = useState("password");
    const [ titleColorEye, setTitleColorEye ] = useState("afficher");
    const [ e, setE ] = useState(true);

   // State input email et password
   
   const [emailSignup, setEmailSignup] = useState("👤Email ");
   const [passwordSignup, setPasswordSignup] = useState("🔐️ Mot de passe");
   
   const [firstname, setFirstname] = useState("Votre prénom");
   const [lastname, setLastname] = useState("Votre nom");
   const [isSignupError, setIsSignupError] = useState(false);
   const [isSignupValid, setIsSignupValid] = useState(false);
   const [decompte, setDecompte] = useState(5);

 // [2] comportements
   // du champ email
   
   const emailHandleChangeSignup = (event) => {
     if(emailSignup.length <= 1){
       setEmailSignup("👤Email ");
     } else {
       setEmailSignup(event.target.value);
     }
   };
 
   //du champ mot de passe
   
   const passwordHandleChangeSignup = (event) => {
     if(passwordSignup.length <= 1){
       setPasswordSignup("🔐️ Mot de passe");
     } else {
       setPasswordSignup(event.target.value);
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
    
    // Fonction Inscription
    function onSignup(event) {
        event.preventDefault();
        

        // On récupère l'email, le mot de passe, le nom et le prénom renseignés par l'utilisateur
        const userEmail = emailSignup;
            console.log(userEmail);
        const userPassword = passwordSignup;
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
  
            
        // Call API Iinscription
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



   return (
            <StyledModal>
                <StyledLink className="modal-toggle" onClick={toggleRegistrationForm}>
                    Pas encore inscrit ?
                </StyledLink>
                <Modal isShowing={isSignup} hide={toggleRegistrationForm} title="Pas encore inscrit ? N'attendez plus, rejoignez vos collègues !">
                    <form onSubmit={onSignup}>         
                        <StyledFormGroup>
                            <input type="email" onChange={emailHandleChangeSignup} name="email" placeholder={emailSignup} title="Votre email" required />
                        </StyledFormGroup>
                        <StyledFormGroup>
                            <StyledInfosPassword>8 caractères minimum - minuscules & majuscules - 2 chiffres minimum</StyledInfosPassword>
                            <input type={typePassword} onChange={passwordHandleChangeSignup} name="password" placeholder={passwordSignup} title="Votre mot de passe" autoComplete="true" required />
                            <StyledEyePassword src={colorEye} alt="eye" onClick={showHidePassword} title={titleColorEye} />
                        </StyledFormGroup>
                        { isSignupError ? (
                            <StyledIsConnectSignupText>
                                L'utilisateur {emailSignup} est déjà inscrit ! Vous allez être redirigé vers la page de connexion dans {decompte} secondes.
                            </StyledIsConnectSignupText>
                        ) : (
                            null
                        )}
                        { isSignupValid ? (
                            <StyledIsConnectSignupText>
                                Votre inscription a bien été prise en compte ! Vous allez être redirigé vers la page de connexion dans {decompte} secondes.
                            </StyledIsConnectSignupText>
                        ) : (
                            null
                        )}
                        <StyledFormGroup>
                            <input type="text" onChange={firstnameHandleChange} name="firstname" placeholder={firstname} title="Votre prénom"  required />
                        </StyledFormGroup>
                        <StyledFormGroup>
                            <input type="text" onChange={lastnameHandleChange} name="lastname" placeholder={lastname} title="Votre nom"  required />
                        </StyledFormGroup>
                        <StyledFormGroup>
                            <input type="submit" value="Inscription" />
                        </StyledFormGroup>
                    </form>
                </Modal>
            </StyledModal>
   )
}
export default Signup;