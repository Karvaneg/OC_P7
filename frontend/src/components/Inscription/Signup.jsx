import React, { useState } from 'react';
import { useModal, Modal } from "../../utils/hooks/setModal";
import { StyledLink, StyledIsConnectSignupText, StyledEyePassword, StyledModal, StyledFormGroup, StyledInfosPassword } from './signupStyle'
import redEye from '../../assets/red_eye.png'
import greenEye from '../../assets/green_eye.png'

function Signup() {

    // [1] state (état, données)

        const { isShowing: isSignup, toggle: toggleRegistrationForm} = useModal();
    
        // State affichage, masquage mot de passe
        const [ colorEye, setColorEye ] = useState(redEye);
        const [ typePassword, setTypePassword ] = useState("password");
        const [ titleColorEye, setTitleColorEye ] = useState("afficher");
        const [ e, setE ] = useState(true);

        // State input email et password
        const [emailSignup, setEmailSignup] = useState("👤Email");
        const [passwordSignup, setPasswordSignup] = useState("🔐️ Mot de passe");
        const [firstname, setFirstname] = useState("Votre prénom");
        const [lastname, setLastname] = useState("Votre nom");
        const [isEmailInDatabase, setIsEmailInDatabase] = useState(false);
        const [isSignupValid, setIsSignupValid] = useState(false);
        const [isPasswordError, setIsPasswordError] = useState(false);
        const [decompte, setDecompte] = useState(5);

        // Regex pour vérifier le format du mot de passe entré par l'utilisateur
        const passwordRegex = /^(?=(.*\d){2,})(?=.*[$-/\\/:-?{-~!"^_'/\\[\]]{0,})(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
   


    // [2] comportements

        // du champ email
        const emailHandleChangeSignup = (event) => {
            if(emailSignup.length <= 1){
                setEmailSignup("👤Email");
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
                // On empêche le rechargement de la page
                event.preventDefault();
                // On récupère l'email, le mot de passe, le nom et le prénom renseignés par l'utilisateur dans les inputs
                const userEmail = emailSignup;
                const userPassword = passwordSignup;
                const userFirstname = firstname;
                const userLastname = lastname;
  
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
  
                // Call API Iinscription
                fetch("http://localhost:8000/api/auth/signup", dataMethod)
                    .then((response) => response.json())
                    .then((data) => {
                        // si format mot de passe Ok et email déjà dans la base de données ou format mot de passe pas ok et...
                        //... email déjà dans la base de données
                        if ((passwordSignup.match(passwordRegex) && data.email === userEmail) || (!passwordSignup.match(passwordRegex) && data.email === userEmail)){
                            // On indique à l'utilisateur qu'il est déjà inscrit
                            setIsPasswordError(false);
                            setIsSignupValid(false);
                            setIsEmailInDatabase(true);

                            // on déclenche un décompte à partir de 5 secondes (état initial de "decompte")
                            const intervalId = setInterval(() => setDecompte((decompte) => decompte - 1,), 1000);
                            // Au bout de 5 secondes, on ferme automatiquement la modal "inscription", on "clear" setInterval,...
                            //... et on réinitialise "decompte", les différents messages et les inputs (remise à l'état initial)
                            setTimeout(function(){
                                toggleRegistrationForm();
                                setEmailSignup("👤Email");
                                setPasswordSignup("🔐️ Mot de passe");
                                setFirstname("Votre prénom");
                                setLastname("Votre nom");
                                setDecompte(5);
                                clearInterval(intervalId);
                                setIsPasswordError(false);
                                setIsSignupValid(false);
                                setIsEmailInDatabase(false);
                            }, 5000);
                        // sinon, si le format du mot de passe est ok et que l'email n'est pas déjà dans la base de données        
                        } else if ((passwordSignup.match(passwordRegex) && data.email !== userEmail)) {
                            // On indique à l'utilisateur que son inscription a bien été faite
                            setIsPasswordError(false);
                            setIsSignupValid(true);
                            setIsEmailInDatabase(false);

                            // on déclenche un décompte à partir de 5 secondes (état initial de "decompte")
                            const intervalId = setInterval(() => setDecompte((decompte) => decompte - 1,), 1000);
                            // Au bout de 5 secondes, on ferme automatiquement la modal "inscription", on "clear" setInterval,...
                            //... et on réinitialise "decompte", les différents messages et les inputs (remise à l'état initial)
                            setTimeout(function(){
                                toggleRegistrationForm();
                                setEmailSignup("👤Email ");
                                setPasswordSignup("🔐️ Mot de passe");
                                setFirstname("Votre prénom");
                                setLastname("Votre nom");
                                setDecompte(5);
                                clearInterval(intervalId);
                                setIsPasswordError(false);
                                setIsSignupValid(false);
                                setIsEmailInDatabase(false);
                            }, 5000);
                        }
                        // Sinon, si le format du mot de passe n'est pas ok et que l'email n'est pas dans la base de données
                        else if ((!passwordSignup.match(passwordRegex) && data.email !== userEmail)) {
                            //On indique à l'utilisateur que le format du mot de passe n'est pas bon
                            setIsPasswordError(true);
                            setIsSignupValid(false);
                            setIsEmailInDatabase(false);
                        }   
                    })
                    .catch((err) => {
                        console.log("Erreur Fetch", err);
                        alert ("Un problème a été rencontré lors de l'envoi du formulaire.");
                    })
            };
    
            // Comportement de l'icône oeil
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
            <StyledModal>
                <StyledLink className="modal-toggle" onClick={toggleRegistrationForm}>
                    Pas encore inscrit ?
                </StyledLink>
                <Modal isShowing={isSignup} hide={toggleRegistrationForm} title="Pas encore inscrit ? N'attendez plus, rejoignez vos collègues !">
                    <form onSubmit={onSignup}>         
                        <StyledFormGroup>
                            <input aria-label="Email" type="email" onChange={emailHandleChangeSignup} name="email" placeholder={emailSignup} required />
                        </StyledFormGroup>
                        
                            <StyledFormGroup>
                                <StyledInfosPassword>8 caractères minimum - minuscules & majuscules - 2 chiffres minimum</StyledInfosPassword>
                                <input aria-label="Mot de passe" type={typePassword} onChange={passwordHandleChangeSignup} name="password" placeholder={passwordSignup} autoComplete="true" required />
                                <StyledEyePassword src={colorEye} alt="eye" onClick={showHidePassword} title={titleColorEye} />
                            </StyledFormGroup>
                        
                        { isEmailInDatabase ? (
                            <StyledIsConnectSignupText>
                                L'utilisateur {emailSignup} est déjà inscrit ! Vous allez être redirigé vers la page de connexion dans {decompte} seconde(s).
                            </StyledIsConnectSignupText>
                        ) : (
                            null
                        )}
                        { isSignupValid ? (
                            <StyledIsConnectSignupText>
                                Votre inscription a bien été prise en compte ! Vous allez être redirigé vers la page de connexion dans {decompte} seconde(s).
                            </StyledIsConnectSignupText>
                        ) : (
                            null
                        )}
                        { isPasswordError ? (
                            <StyledIsConnectSignupText>
                                Le format du mot de passe est incorrect !
                            </StyledIsConnectSignupText>
                        ) : (
                            null
                        )}

                        <StyledFormGroup>
                            <input aria-label="Prénom" type="text" onChange={firstnameHandleChange} name="firstname" placeholder={firstname} required />
                        </StyledFormGroup>
                        <StyledFormGroup>
                            <input aria-label="Nom" type="text" onChange={lastnameHandleChange} name="lastname" placeholder={lastname} required />
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