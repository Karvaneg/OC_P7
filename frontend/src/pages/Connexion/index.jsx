import profile from '../../assets/profile.png'
import colors from '../../utils/style/colors'
import { StyledLink } from '../../utils/style/Theme'
//import { TitleH1 } from '../../utils/style/Theme'
import { IsConnectSignupText, ProfileImageDefaut, EyePassword, Container, ConnectionForm } from '../../utils/style/theme/connexion'
import { DocumentTitle } from "../../utils/hooks/setDocumentTitle" 
import { useDocumentTitle } from "../../utils/hooks/setDocumentTitle"
import redEye from '../../assets/red_eye.png'
import greenEye from '../../assets/green_eye.png'
import { useState } from "react"
import React from "react"
//import Inscription from "../../components/Inscription"
import { useModal, Modal } from "../../utils/hooks/setModal";




function Connexion() {
  useDocumentTitle(`${DocumentTitle.connexion}`);
  const {isShowing: isRegistrationFormShowed, toggle: toggleRegistrationForm} = useModal();
  // [1] state (état, données)

    // State affichage Modal Signup
   // const [isModalSignup, setIsModalSignup] = useState(false);

  
    // State affichage, masquage mot de passe
     const [ colorEye, setColorEye ] = useState(redEye);
     const [ typePassword, setTypePassword ] = useState("password");
     const [ titleColorEye, setTitleColorEye ] = useState("afficher");
     const [ e, setE ] = useState(true);

    // State input email et password
    const [email, setEmail] = useState("👤Email ");
    const [password, setPassword] = useState("🔐️ Mot de passe");
    const [emailSignup, setEmailSignup] = useState("👤Email ");
    const [passwordSignup, setPasswordSignup] = useState("🔐️ Mot de passe");
    const [isConnect, setIsConnect] = useState(false);
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
    const emailHandleChangeSignup = (event) => {
      if(emailSignup.length <= 1){
        setEmailSignup("👤Email ");
      } else {
        setEmailSignup(event.target.value);
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
      // Call API
      fetch("http://localhost:8000/api/auth/login", dataMethod)
      .then((response) => response.json())
      .then((data) => {
          console.log(data);

        if (data.token) {
          console.log(data.token);
          setIsConnect(false);
          // const testObject = { "token": data.token, 'userId': data.userId };
          // localStorage.setItem("testObject", JSON.stringify(testObject));
          // const retrievedObject = JSON.parse(localStorage.getItem('testObject'));
          // console.log('retrievedObject: ', retrievedObject);
          
          localStorage.setItem("token", data.token);
          localStorage.setItem("userIdConnected", data.userId);
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

    const handleSubmitSignup = (event) => {
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

    // const showHideSignupModal = (event) => {
    //   if(event) {
        
    //     setIsModalSignup(true);
        
    //   } else {
        
    //     setIsModalSignup(false);
        
    //   }
    // };
  
  
  // [3] affichage (render et rerender)
  return (
    <div>
    {/* { isModalSignup ? (
        <Inscription />
    ) : ( */}
      <Container>
      
      <h1>
        Bienvenue sur le réseau social interne de votre entreprise !
      </h1>
      <ConnectionForm>
      
        <ProfileImageDefaut src={profile} alt="profileImageDefaut" />
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email"  onChange={emailHandleChange} name="email" placeholder={email} title="Votre email" required />
          </div>
          <div>
            <input type={typePassword} onChange={passwordHandleChange} name="password" placeholder={password} title="Votre mot de passe" autoComplete="true"  required />
            <EyePassword src={colorEye} alt="eye" onClick={showHidePassword} title={titleColorEye} />
          </div>
          { isConnect ? (
          <IsConnectSignupText>
            Votre adresse email ou votre mot de passe est incorrect. Veuillez vérifier les informations saisies.
          </IsConnectSignupText>
          ) : (
            <div></div>
          )}
          <div></div>
          <div>
            <input type="submit" value="Connexion" />

          </div>
        </form>
        <StyledLink to="/inscription" /*onClick={showHideSignupModal}*/>
          Pas encore inscrit ?
        </StyledLink>
        <StyledLink className="modal-toggle" onClick={toggleRegistrationForm}>
        Pas encore inscrit ?
        </StyledLink>
        </ConnectionForm>
    </Container>
    <div className="App">
        <Modal
          isShowing={isRegistrationFormShowed}
          hide={toggleRegistrationForm}
          title="Pas encore inscrit ? N'attendez plus, rejoignez vos collègues !"
        >
          <form onSubmit={handleSubmitSignup}>
            <div className="form-group">
            <input type="email" onChange={emailHandleChangeSignup} name="email" placeholder={emailSignup} title="Votre email" required />
            </div>
            <div className="form-group">
            <input type={typePassword} onChange={passwordHandleChangeSignup} name="password" placeholder={passwordSignup} title="Votre mot de passe" autoComplete="true" required />
            <EyePassword src={colorEye} alt="eye" onClick={showHidePassword} title={titleColorEye} />
            </div>
            { isSignupError ? (
          <IsConnectSignupText>
            L'utilisateur {emailSignup} est déjà inscrit ! Vous allez être redirigé vers la page de connexion dans {decompte} secondes.
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
            <div className="form-group">
            <input type="text" onChange={firstnameHandleChange} name="firstname" placeholder={firstname} title="Votre prénom"  required />
            </div>
            <div className="form-group">
            <input type="text" onChange={lastnameHandleChange} name="lastname" placeholder={lastname} title="Votre nom"  required />
            </div>
            <div className="form-group">
              <input type="submit" value="Inscription" />
            </div>
          </form>
        </Modal>
      </div>

      <style jsx="true">{`
        .App {
         // height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        // button.modal-toggle,
        // input[type="submit"] {
        //   background-color: turquoise;
        //   cursor: pointer;
        //   padding: 1rem 2rem;
        //   text-transform: uppercase;
        //   border: none;
        // }
        

        button.modal-toggle:not(:first-child) {
          margin-left: 10px;
        }

        .form-group {
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
        } 
          
          input[type=submit]{
            border-radius: 25px;
            border: none;
            
            margin: 10px;
            padding: 10px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            cursor: pointer;
            width: 180px;
            height: 40px;
            align-items: center;
            font-weight: bold;
            font-size: 15px;
            color: ${colors.primary};
            box-shadow: 0px 6px 10px ${colors.tertiary};
            transition: transform 110ms ease-in-out;
          &:hover{
            box-shadow: 0px 3px 10px ${colors.tertiary};
            transform: translate(0px,1px); 
          }
        }
        

        input[type="text"],
        input[type="password"],
        input[type="email"] {
          box-sizing: border-box;
          width: 100%;
          padding: 0.5rem 0.7rem;
        }

        
      `}</style>
      
  </div>
  );
  
}

export default Connexion;
