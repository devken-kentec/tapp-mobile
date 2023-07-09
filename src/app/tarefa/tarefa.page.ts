import { TarefaListService } from './../tarefa-list/shared/tarefa-list.service';
import { TarefaService } from './shared/tarefa.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/global.service';
import { ActivatedRoute } from '@angular/router';
import { Tarefa } from './shared/tarefa';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.page.html',
  styleUrls: ['./tarefa.page.scss'],
})
export class TarefaPage implements OnInit {

  btnSalvar = true;
  btnAtualizar = false;
  id: number;

  tarefaForm = this.fb.group({
    id: [''],
    inicio: [''],
    entrega: [''],
    hora: [''],
    prioridade: [''],
    descricao: [''],
    observacao: [''],
    statusTarefa: [''],
    usuarioId: ['']
  });

  constructor(private fb: FormBuilder,
              private globalService: GlobalService,
              private tarefaService: TarefaService,
              private route: ActivatedRoute,
              private tarefaListService: TarefaListService
              ) { }

  ngOnInit() {

    const routeParams = this.route.snapshot.params;
    this.findById(routeParams.id);

    this.id = this.globalService.getId();
    this.tarefaForm.patchValue({usuarioId: this.id});
  }

  salvarTarefa(){
    if(this.tarefaForm.valid){
      this.tarefaService.createTarefa(this.tarefaForm.value).subscribe(
        success => { this.globalService.saveToast(); }
      );
      this.tarefaForm.reset();
    }
  }

  atualizarTarefa(){
    if(this.tarefaForm.valid){
        this.tarefaService.updateTarefa(this.tarefaForm.value).subscribe(
          success => { this.globalService.updateToast(); }
        );
        this.tarefaForm.reset();
    }
  }

  findById(id: number){
    if(id != null){
      this.tarefaListService.listarTarefaId(id).subscribe((dados: any)=> {
        this.updateTarefaForm(dados);
        this.btnSalvar = false;
        this.btnAtualizar = true;
      });
    }
  }

  updateTarefaForm(tarefa: Tarefa){
    this.tarefaForm.patchValue(tarefa);
  }

}
