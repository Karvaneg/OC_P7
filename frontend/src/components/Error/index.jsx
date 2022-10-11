import {DocumentTitle} from "../../utils/hooks/setDocumentTitle" 
import {useDocumentTitle} from "../../utils/hooks/setDocumentTitle"


function Error() {
    useDocumentTitle(`${DocumentTitle.error}`);
    return (
      <div>
          Il semblerait que la page que vous cherchez n’existe pas !
      </div>
    )
  }
  
  export default Error