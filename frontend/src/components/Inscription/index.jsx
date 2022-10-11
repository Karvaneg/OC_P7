import {DocumentTitle} from "../../utils/hooks/setDocumentTitle" 
import {useDocumentTitle} from "../../utils/hooks/setDocumentTitle"
import { TitleH1 } from '../../utils/style/Theme'
import { ProfileImageDefaut } from '../../utils/style/Theme'
import { Container } from '../../utils/style/Theme'
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
    const [email, setEmail] = useState("Votre email");
    const [password, setPassword] = useState("Votre mot de passe");
    const [firstName, setFirstName] = useState("Votre prénom");
    const [lastName, setLastName] = useState("Votre nom");
      
    // [2] comportements
      
        // du champ email
      
        //du champ mot de passe
      
      
        // du bouton inscription
        const handleSubmit = () => {
            alert("handleSubmit");
        };
        
        // de l'icône oeil
          const [ colorEye, setColorEye ] = useState(redEye);
          const [ typePassword, setTypePassword ] = useState("password")
          const [ e, setE ] = useState(true);
          const showHidePassword = () => {
            if(e === true) {
              setTypePassword("text");
              setColorEye(greenEye);
              setE(false);
            } else {
              setTypePassword("password")
              setColorEye(redEye);
              setE(true);
            }
          };
        
        
    // [3] affichage (render et rerender)
    return (
    <Container>
      <TitleH1>
        Pas encore inscrit ? N'attendez plus, rejoignez vos collègues !
      </TitleH1>
      <ConnectionForm>
        <ProfileImageDefaut src={profile} alt="profileImageDefaut" />
      
        <form onSubmit={handleSubmit}>
          <div>
            <input type="email" name="email" placeholder={email} title="Votre email" required />
            <input type={typePassword} name="password" placeholder={password} title="Votre mot de passe"  required />
            <EyePassword src={colorEye} alt="eye" onClick={showHidePassword} />
          </div>
          <div>
            <input type="text" name="firstname" placeholder={firstName} title="Votre prénom"  required />
            <input type="text" name="lastname" placeholder={lastName} title="Votre nom"  required />
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