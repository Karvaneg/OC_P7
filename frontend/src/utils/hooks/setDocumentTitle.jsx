import { useEffect, useState } from "react";

const useDocumentTitle = title => {
  const [document_title, setDocumentTitle] = useState(title);
   useEffect(() => {
    document.title = document_title; 
  },[document_title]);

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