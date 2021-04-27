export default class FileUpload {
    key!: string;
    name!: string;
    url!: string;
    file: File;
    idGroupe: string;
    idAuteur: string;
    date: Date;
    score = 0;
    nbLikes = 0;
    nbDislikes = 0;
    id: string;
    titre: string;

    constructor(file: File) {
      this.file = file;
    }
  }