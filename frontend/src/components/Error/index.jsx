import { DocumentTitle } from "../../utils/hooks/setDocumentTitle" 
import { useDocumentTitle } from "../../utils/hooks/setDocumentTitle"
import seul_au_monde from "../../assets/seul_au_monde.webp"
import { StyledTextError, StyledImageError, StyledImageDivError, StyledContainerError, StyledIntrouvable, Styled404 } from "./StyledError"


function Error() {
    // Permet de donner un nom à l'onglet du navigateur
    useDocumentTitle(`${DocumentTitle.error}`);
    return (
      <StyledContainerError>
        <StyledTextError>
            <Styled404>ERREUR 404</Styled404>
            <StyledIntrouvable>Communauté introuvable !</StyledIntrouvable>
        </StyledTextError>
        <StyledImageDivError>
            <StyledImageError src={seul_au_monde} alt="404"/>
        </StyledImageDivError>
      </StyledContainerError>
    )
  }
  
  export default Error