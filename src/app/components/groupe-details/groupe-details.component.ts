import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { Groupe } from 'src/app/shared/models/groupe.model';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-groupe-details',
  templateUrl: './groupe-details.component.html',
  styleUrls: ['./groupe-details.component.css']
})
export class GroupeDetailsComponent implements OnInit {

  public editForm: FormGroup;
  groupeRef: any;

  constructor(
    public groupeService: GroupeService,
    public formBuilder: FormBuilder,
    private act: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.formBuilder.group({
      nom: [''],
      type: [''],
      photoUrl: ['']
    });
  }

  ngOnInit(): void {
    const idGroupe = this.act.snapshot.paramMap.get('idGroupe');

    if (idGroupe  != null) {
      this.groupeService.getGroupeDoc(idGroupe).subscribe((res: any) => {
        this.groupeRef = res;
        this.editForm = this.formBuilder.group({
          nom: [this.groupeRef.nom],
          type: [this.groupeRef.type],
          photoUrl: [this.groupeRef.contact]
        });
      });
    }
  }

  onSubmit(): void {
    const idGroupe = 'q2DzYsr7gI6vBg3D8hsJ';

    if (idGroupe != null) {
      this.groupeService.updateGroupe(this.editForm.value, idGroupe);
      this.router.navigate(['groupe-list']);
    }
  }

}
