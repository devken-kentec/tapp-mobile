import { TarefaListService } from './shared/tarefa-list.service';
import { GlobalService } from './../shared/global.service';
import { Tarefa } from './../tarefa/shared/tarefa';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tarefa-list',
  templateUrl: './tarefa-list.page.html',
  styleUrls: ['./tarefa-list.page.scss'],
})
export class TarefaListPage implements OnInit {

  tarefas: Tarefa[] = [];

  constructor(private tarefaListService: TarefaListService,
              private globalService: GlobalService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
    this.listarTarefa(this.globalService.getId());
  }

  onEdit(id){
    this.router.navigate(['tarefa/editar', id]);
  }

  listarTarefa(id: number){
    this.tarefaListService.listarTarefa(id).subscribe(res => {
      this.tarefas = res;
    },
      (error) => { this.globalService.loginErrorToast();
      }
    );
  }

  excluirTarefa(id: number){
    this.tarefaListService.removeTarefa(id).subscribe(
      success=> {
        this.listarTarefa(this.globalService.getId());
        this.globalService.removeToast();
       }
    );
  }


  async presentAlertConfirm(id: number, assunto: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar exclusão!',
      message: assunto,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Confirmar',
          handler: () => {
            this.excluirTarefa(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async pegarData() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Dígite a data',
      inputs: [
        {
          name: 'data',
          type: 'date',
          placeholder: 'Data'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Confirmar',
          handler: inputs => {
            this.pesquisarTarefa(inputs.data);
          }
        }
      ]
    });
    await alert.present();
  }

  pesquisarTarefa(data: string){
    this.tarefaListService.buscaAvancada(data).subscribe(
      res => this.tarefas = res
    );
  }

}
