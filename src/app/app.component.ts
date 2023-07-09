import { AlertController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { GlobalService } from './shared/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  mostarConfiguracoes = false;
  mostrarMenu = false;
  nome: string;

  constructor(private globalService: GlobalService,
              private alertController: AlertController) {}

  ngOnInit(): void {

  this.globalService.mostrarMenu.subscribe((menu: boolean)=>{
      this.mostrarMenu = menu;
  });

  this.globalService.gId.subscribe((id: number)=>{
    this.globalService.setId(id);
  });

  this.globalService.gLogin.subscribe((nome: string )=>{
     this.globalService.setNome(nome);
     this.nome = this.globalService.getNome();
  });

  this.globalService.gRole.subscribe((role: string)=>{
    if(role === 'Administrador'){
      this.mostarConfiguracoes = true;
    };
  });
  }

}


