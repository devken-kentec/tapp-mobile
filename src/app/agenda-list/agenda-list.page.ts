import { AgendaListService } from './shared/agenda-list.service';
import { Agenda } from './../agenda/shared/agenda';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../shared/global.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agenda-list',
  templateUrl: './agenda-list.page.html',
  styleUrls: ['./agenda-list.page.scss'],
})
export class AgendaListPage implements OnInit {

  idUsuario: number;
  agendas: Agenda[] = [];


  constructor(private globalService: GlobalService,
              private agendaListService: AgendaListService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
    this.idUsuario = this.globalService.getId();
    this.listarAgenda(this.idUsuario);
  }

  async listarAgenda(idUsuario: number){
   await this.agendaListService.listarAgenda(idUsuario).subscribe(res=> {
      this.agendas = res;
     },
      (error) => { this.globalService.loginErrorToast();
      });
  }

  onEdit(id: number){
    this.router.navigate(['agenda/editar', id]);
  }

  excluirAgenda(id: number){
    this.agendaListService.removeAgenda(id).subscribe(
      success=> {
        this.listarAgenda(this.globalService.getId());
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
            this.excluirAgenda(id);
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
            this.pesquisarAgenda(inputs.data);
          }
        }
      ]
    });
    await alert.present();
  }

  pesquisarAgenda(data: string){
    this.agendaListService.buscaAvancada(data).subscribe(
      res => this.agendas = res
    );
  }
}
