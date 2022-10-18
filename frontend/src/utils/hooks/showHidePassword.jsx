import {  useState } from "react";
import redEye from '../../assets/red_eye.png'
import greenEye from '../../assets/green_eye.png'



function ShowHidePassword  () {
 
 const [ colorEye, setColorEye ] = useState(redEye);
   
    const [ typePassword, setTypePassword ] = useState("password");
    
    const [ titleColorEye, setTitleColorEye ] = useState("afficher");
    
    const [ e, setE ] = useState(true);
    

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

    return [ShowHidePassword, colorEye, typePassword, titleColorEye ];

  };

  export {ShowHidePassword};