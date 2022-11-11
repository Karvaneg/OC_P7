import { useEffect, useState } from "react";

const useDocumentTitle = title => {

  // [1] state (état, données)
  const [document_title, setDocumentTitle] = useState(title);

  // [2] comportements
   useEffect(() => {
    document.title = document_title; 
  },[document_title]);

  // [3] affichage (render et rerender)
  return [document_title, setDocumentTitle];
};

export {useDocumentTitle};

const DocumentTitle = {
  connexion: 'Connexion - Groupomania',
  inscription: 'Inscription - Groupomania',
  profil: 'Mon profil - Groupomania',
  dashboard: 'Tableau de bord - Groupomania',
  error: 'Page Introuvable - Groupomania'
}

export {DocumentTitle};