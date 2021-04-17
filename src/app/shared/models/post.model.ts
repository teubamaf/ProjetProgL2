export default class Post {
    id: string;
    idCreateur: string;
    idGroupe: string;
    titre: string;
    contenu: string;
    date: string;
    scorePost = 0;
    nbLikes = 0;
    nbDislikes = 0;
    nbVues = 0;
}
