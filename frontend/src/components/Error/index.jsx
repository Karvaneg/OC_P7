import {DocumentTitle} from "../../utils/hooks/setDocumentTitle" 
import {useDocumentTitle} from "../../utils/hooks/setDocumentTitle"
import seul_au_monde from "../../assets/seul_au_monde.webp"


function Error() {
    useDocumentTitle(`${DocumentTitle.error}`);
    return (
      <div>
        <div>
            <div>ERREUR 404</div>
            <div>Communauté introuvable !</div>
        </div>
        <div>
            <img src={seul_au_monde} alt="404"/>
        </div>
      </div>
    )
  }
  
  export default Error