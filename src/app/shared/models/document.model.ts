export default class Document {
    id: string;
    nom: string;
    url: string;
    file: File;
    idGroupe: string;
    idAuteur: string;
    date: string;
    score = 0;
    nbLikes = 0;
    nbDislikes = 0;
    titre: string;

    constructor(file: File) {
      this.file = file;
    }
}
