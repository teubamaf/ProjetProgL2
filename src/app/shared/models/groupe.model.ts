import { AngularFirestoreCollection } from "@angular/fire/firestore";

export default class Groupe {
    id: string;
    nom: string;
    type: string;
    photoUrl: string;
    idCreateur: string;
    nbMembres = 0;
    membres: AngularFirestoreCollection;
}
