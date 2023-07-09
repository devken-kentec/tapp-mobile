import { AppComponent } from './../app.component';
import { GlobalService } from './../shared/global.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  cont: any;
  nome = '';

  constructor(private globalService: GlobalService,
              private alertController: AlertController) {}

  ngOnInit(): void {
    this.globalService.startServer().subscribe(
      res => this.cont = res
    );
  }

  logar(pin: number){
    this.globalService.loadByPin(pin).subscribe((res: any)=>{

     this.globalService.mostrarMenu.emit(true);
     this.globalService.gId.emit(res.id);
     this.globalService.gRole.emit(res.role);
     this.globalService.gLogin.emit(res.nome);
     this.globalService.loginToast();
   });
 }

 async pegarPin() {
   const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Dígite o PIN de Acesso',
     inputs: [
       {
         name: 'pin',
         type: 'number',
         placeholder: 'PIN'
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
           this.logar(inputs.pin);
         }
       }
     ]
   });
   await alert.present();
 }

}
