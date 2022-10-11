import { DocumentTitle } from "../../utils/hooks/setDocumentTitle" 
import { useDocumentTitle } from "../../utils/hooks/setDocumentTitle"
import { Container } from '../../utils/style/Theme'
import { TitleH1 } from '../../utils/style/Theme'

function Dashboard() {
    useDocumentTitle(`${DocumentTitle.dashboard}`);



    // affichage (render et rerender)
  return (
    <Container>
      <TitleH1>
        Tableau de bord
      </TitleH1>
    </Container>
  );


}
export default Dashboard;