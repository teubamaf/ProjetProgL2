export default class Commentaire {
    id: string;
    idPost: string;
    idCrea: string;
    idGroupe: string;
    date: string;
    contenu: string;
    nbDislike = 0;
    nbLikes = 0;
    nbVues = 0;
    scorePost = 0;
}
