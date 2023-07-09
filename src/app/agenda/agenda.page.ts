import { AgendaListService } from './../agenda-list/shared/agenda-list.service';
import { AgendaService } from './shared/agenda.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from '../shared/global.service';
import { ActivatedRoute } from '@angular/router';
import { Agenda } from './shared/agenda';



@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
})
export class AgendaPage implements OnInit {

  id: number;
  btnAtualizar = false;
  btnSalvar = true;

  agendaForm = this.fb.group({
    id:[''],
    data: ['',[ Validators.required]],
    hora: [''],
    assunto: [''],
    descricao: [''],
    usuarioId: ['']
  });

  constructor(private fb: FormBuilder,
              private agendaListService: AgendaListService,
              private agendaService: AgendaService,
              private globalService: GlobalService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    const routeParams = this.route.snapshot.params;

    this.findById(routeParams.id);

    this.id = this.globalService.getId();
    this.agendaForm.patchValue({usuarioId: this.id});
  }

  findById(id: number){
    if(id != null){
      this.agendaListService.loadById(id).subscribe((dados: Agenda)=>{
        this.updateAgendaForm(dados);
        this.btnSalvar = false;
        this.btnAtualizar = true;
    });
    }
  }

  salvarAgenda(){
    if(this.agendaForm.valid){
        this.agendaService.createAgenda(this.agendaForm.value).subscribe(
          success => { this.globalService.saveToast(); }
        );
        this.agendaForm.reset();
    }
  }

  atualizarAgenda(){
    if(this.agendaForm.valid){
        this.agendaService.updateAgenda(this.agendaForm.value).subscribe(
          success => { this.globalService.updateToast(); }
        );
        this.agendaForm.reset();
    }
  }

  updateAgendaForm(agenda: Agenda){
    this.agendaForm.patchValue(agenda);
  }

}
