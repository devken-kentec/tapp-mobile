import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  myToast: any;
  id: any;
  nome: any;

  private readonly api = `${environment.api}/7475646f61717569/api`;

  constructor(private toast: ToastController,
              private http: HttpClient) { }

   // eslint-disable-next-line @typescript-eslint/member-ordering
   mostrarMenu = new EventEmitter<boolean>();

  // eslint-disable-next-line @typescript-eslint/member-ordering
  gLogin = new EventEmitter<string>();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  gId = new EventEmitter<number>();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  gRole = new EventEmitter<string>();

  startServer(){
    return this.http.get(`${this.api}/usuario/count`).pipe(
      take(1)
    );
  }

  loadByPin(pin: number){
    return this.http.get(`${this.api}/usuario/${pin}`).pipe(
      take(1)
    );
  }

  setNome(nome: string) {
    this.nome = nome;
    return nome;
  }

  getNome() {
    return this.nome;
  }

  setId(id: number) {
    this.id = id;
    return id;
  }

  getId() {
    return this.id;
  }

  loginToast() {
    this.myToast = this.toast.create({
      message: 'Logado com Sucesso!',
      duration: 3000
    }).then((toastData) => {
      toastData.present();
    });
  }

  saveToast() {
    this.myToast = this.toast.create({
      message: 'Salvo com Sucesso!',
      duration: 3000
    }).then((toastData) => {
      toastData.present();
    });
  }

  updateToast() {
    this.myToast = this.toast.create({
      message: 'Atualizado com Sucesso!',
      duration: 3000
    }).then((toastData) => {
       toastData.present();
    });
  }

  removeToast() {
    this.myToast = this.toast.create({
      message: 'Removido com Sucesso!',
      duration: 3000
    }).then((toastData) => {
       toastData.present();
    });
  }

  loginErrorToast() {
    this.myToast = this.toast.create({
      message: 'Faça o login primeiro!',
      duration: 3000
    }).then((toastData) => {
       toastData.present();
    });
  }

  primeiroDia(dataInicial){
    const monName = new Array ('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
    const now = new Date();
    if(dataInicial === ''){
      dataInicial = now.getFullYear()+'-'+monName[now.getMonth()] +'-'+'01';
    }
    return dataInicial;
  }

  ultimoDia(dataFinal){
    const monName = new Array ('01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12');
    const endDay = new Array ('31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '30');
    const now = new Date();
    if(dataFinal === ''){
      dataFinal = now.getFullYear() +'-'+monName[now.getMonth()]+'-'+endDay[now.getMonth()];
    }
    return dataFinal;
  }

  converterMoeda(valor: any){
    const convert: any = valor.toFixed(2);
    const fixed: any = convert.replace('.', ',');
    return fixed;
  }
}
