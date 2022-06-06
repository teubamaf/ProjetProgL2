import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CommentaireService } from 'src/app/shared/services/commentaire.service';
import { FileService } from 'src/app/shared/services/file.service';
import { MembreService } from 'src/app/shared/services/membre.service';
import { PostService } from 'src/app/shared/services/post.service';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-statistiques-groupe',
  templateUrl: './statistiques-groupe.component.html',
  styleUrls: ['./statistiques-groupe.component.css']
})
export class StatistiquesGroupeComponent implements OnInit {

  items: Observable<any[]>;
  itemPosts: Observable<any[]>;
  itemUsers: Observable<any[]>;
  itemMembres: Observable<any[]>;
  itemDocuments: Observable<any[]>;

  uid = this.authService.userData.uid;

  id: string;
  cpt = 0;
  cptPost = 0;
  cptPt = 0;
  cpt1 = 0;
  cpt2 = 0;
  cpt3 = 0;
  cpt4 = 0;
  cpt5 = 0;
  cpt6 = 0;
  cpt7 = 0;
  cpt8 = 0;
  cpt9 = 0;
  cpt10 = 0;
  cpt11 = 0;
  cpt12 = 0;
  cp1 = 0;
  cp2 = 0;
  cp3 = 0;
  cp4 = 0;
  cp5 = 0;
  cp6 = 0;
  cp7 = 0;
  cp8 = 0;
  cp9 = 0;
  cp10 = 0;
  cp11 = 0;
  cp12 = 0;
  compteur = 0;
  cptDis = 0;

  commentaires: any;
  posts: any;
  membres: any;

  tab: any[] = [];
  tmp: any[][number] = [];
  tabi: any[] = [];

    lineChartData: ChartDataSets[];

    lineChartLabels: Label[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    lineChartOptions = {
      responsive: true,
      title: {
        display: true,
        text: 'Nombre de nouveaux membres par mois'
      },
      scales: { yAxes:
        [{
          display: true,
          stacked: true,
          ticks: {
            min: 0,
            max: 50,
            fontColor: 'rgba(0,0,0,0.5)',
            fontStyle: 'bold',
            beginAtZero: true,
            padding: 10
          },
          gridLines: {
              drawTicks: false,
              display: false

          }
        }],
        xAxes: [{
          gridLines: {
              zeroLineColor: 'transparent'
          },
          ticks: {
              padding: 20,
              fontColor: 'rgba(0,0,0,0.5)',
              fontStyle: 'bold'
          }
        }]
      }
    };

    lineChartColors: Color[] = [
    {

    },
  ];

    lineChartLegend = false;
    lineChartPlugins = [];
    lineChartType = 'line';

    lineChartData2: ChartDataSets[];

    // tslint:disable-next-line:max-line-length
    lineChartLabels2: Label[] = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

    lineChartOptions2 = {
      responsive: true,
      title: {
        display: true,
        text: 'Nombre de nouvelles publications par mois'
      },
      scales: { yAxes:
        [{
          display: true,
          stacked: true,
          ticks: {
            min: 0,
            max: 50,
            fontColor: 'rgba(0,0,0,0.5)',
            fontStyle: 'bold',
            beginAtZero: true,
            padding: 10
          },
          gridLines: {
              drawTicks: false,
              display: false

          }
        }],
        xAxes: [{
          gridLines: {
              zeroLineColor: 'transparent'
          },
          ticks: {
              padding: 20,
              fontColor: 'rgba(0,0,0,0.5)',
              fontStyle: 'bold'
          }
        }]
      }
    };

    lineChartColors2: Color[] = [
    {

    },
  ];

    lineChartLegend2 = false;
    lineChartPlugins2 = [];
    lineChartType2 = 'line';

  constructor(
    private activatedRoute: ActivatedRoute,
    public firestore: AngularFirestore,
    public fileService: FileService,
    public authService: AuthService,
    public commentaireService: CommentaireService,
    public postService: PostService,
    public membreService: MembreService
  ) {
    this.items = firestore.collection(`groupes`).valueChanges();
    this.itemPosts = firestore.collection(`post`).valueChanges();
    this.itemUsers = firestore.collection(`users`).valueChanges();
    this.itemMembres = firestore.collection(`membres`).valueChanges();
    this.itemDocuments = firestore.collection(`uploads`).valueChanges();
  }

  ngOnInit(): void {
    // Note: Below 'queryParams' can be replaced with 'params' depending on your requirements
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.retrieveCommentaires();
    this.retrievePost();
    this.retrieveMembreDate();
  }

  retrieveCommentaires(): void {
    this.commentaireService.getGroupe(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.commentaires = data;
      this.cpt = this.commentaires.length;
    });
  }

  retrievePost(): void {
    this.postService.getPost(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.posts = data;
      console.log(this.posts);
      this.posts.forEach(doc => {
        this.cptDis = this.cptDis + doc.nbDislikes;
        this.cptPt = this.cptPt + doc.nbLikes;
        if (doc.nbLikes > 0) {
          this.cptPost = this.cptPost + doc.nbLikes;
        }
      });
      this.posts.forEach(doc => {
        const date = doc.date;
        const momentVariable = moment(date, 'DD/MM/YYYY').format();
        const datebis = new Date(momentVariable);
        const mois = datebis.getMonth() + 1 ;
        if (mois === 1) {
          this.cp1 = this.cp1 + 1;
        }
        else if (mois === 2) {
          this.cp2 = this.cp2 + 1;
        }
        else if (mois === 3) {
          this.cp3 = this.cp3 + 1;
        }
        else if (mois === 4) {
          this.cp4 = this.cp4 + 1;
        }
        else if (mois === 5) {
          this.cp5 = this.cp5 + 1;
        }
        else if (mois === 6) {
          this.cp6 = this.cp6 + 1;
        }
        else if (mois === 7) {
          this.cp7 = this.cp7 + 1;
        }
        else if (mois === 8) {
          this.cp8 = this.cp8 + 1;
        }
        else if (mois === 9) {
          this.cp9 = this.cp9 + 1;
        }
        else if (mois === 10) {
          this.cp10 = this.cp10 + 1;
        }
        else if (mois === 11) {
          this.cp11 = this.cp11 + 1;
        }
        else if (mois === 12) {
          this.cp12 = this.cp12 + 1;
        }
        this.lineChartData2 = [
          {
            borderColor: '#5DADE2',
            pointBorderColor: '#5DADE2',
            pointBackgroundColor: '#5DADE2',
            pointHoverBackgroundColor: '#5DADE2',
            pointHoverBorderColor: '#5DADE2',
            pointBorderWidth: 3,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            backgroundColor: '#6FD2E7',
            fill: true,
            borderWidth: 4,
            // tslint:disable-next-line:max-line-length
            data: [this.cp1, this.cp2, this.cp3, this.cp4, this.cp5, this.cp6, this.cp7, this.cp8, this.cp9, this.cp10, this.cp11, this.cp12]
          },
        ];
      });
    });
  }

  retrieveMembreDate(): void {
    this.membreService.getMembreDate(this.id).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.tab = data;
      this.tab.forEach(doc => {
        const date = doc.dateInscription;
        const momentVariable = moment(date, 'DD/MM/YYYY').format();
        const datebis = new Date(momentVariable);
        const mois = datebis.getMonth() + 1 ;
        if (mois === 1) {
          this.cpt1 = this.cpt1 + 1;
        }
        else if (mois === 2) {
          this.cpt2 = this.cpt2 + 1;
        }
        else if (mois === 3) {
          this.cpt3 = this.cpt3 + 1;
        }
        else if (mois === 4) {
          this.cpt4 = this.cpt4 + 1;
        }
        else if (mois === 5) {
          this.cpt5 = this.cpt5 + 1;
        }
        else if (mois === 6) {
          this.cpt6 = this.cpt6 + 1;
        }
        else if (mois === 7) {
          this.cpt7 = this.cpt7 + 1;
        }
        else if (mois === 8) {
          this.cpt8 = this.cpt8 + 1;
        }
        else if (mois === 9) {
          this.cpt9 = this.cpt9 + 1;
        }
        else if (mois === 10) {
          this.cpt10 = this.cpt10 + 1;
        }
        else if (mois === 11) {
          this.cpt11 = this.cpt11 + 1;
        }
        else if (mois === 12) {
          this.cpt12 = this.cpt12 + 1;
        }
        this.lineChartData = [
          {
            borderColor: '#5DADE2',
            pointBorderColor: '#5DADE2',
            pointBackgroundColor: '#5DADE2',
            pointHoverBackgroundColor: '#5DADE2',
            pointHoverBorderColor: '#5DADE2',
            pointBorderWidth: 3,
            pointHoverRadius: 10,
            pointHoverBorderWidth: 1,
            pointRadius: 3,
            backgroundColor: '#6FD2E7',
            fill: true,
            borderWidth: 4,
            // tslint:disable-next-line:max-line-length
            data: [this.cpt1, this.cpt2, this.cpt3, this.cpt4, this.cpt5, this.cpt6, this.cpt7, this.cpt8, this.cpt9, this.cpt10, this.cpt11, this.cpt12]
          },
        ];
      });
    });
  }


}
