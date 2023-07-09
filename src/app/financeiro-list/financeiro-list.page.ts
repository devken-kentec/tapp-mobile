import { AlertController } from '@ionic/angular';
import { GlobalService } from './../shared/global.service';
import { Component, OnInit } from '@angular/core';
import { Financeiro } from '../financeiro/shared/financeiro';
import { FinanceiroListService } from './shared/financeiro-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-financeiro-list',
  templateUrl: './financeiro-list.page.html',
  styleUrls: ['./financeiro-list.page.scss'],
})
export class FinanceiroListPage implements OnInit {

  financeiros: Financeiro[]=[];
  data= '';
  tipo= '';
  dataInicial= '';
  dataFinal= '';
  recurso= '';
  liberarPesquisaAvancada = false;
  somatorioReceitas = 0;
  somatorioDespesas = 0;
  recebimentos: string;
  pagamentos: string;
  total: number;
  resultado: any;


  constructor(public globalService: GlobalService,
              private financeiroListService: FinanceiroListService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {
    const usuarioId = this.globalService.getId();
    this.listarFinanceiro(usuarioId, this.globalService.primeiroDia(this.data), this.globalService.ultimoDia(this.data));
  }

  async listarFinanceiro(id: number, dataI: string, dataF: string){
    await this.financeiroListService.listarFinanceiro(id, dataI, dataF).subscribe((res: any) => {
      this.financeiros = res;
      this.recebimentos = '';
      this.pagamentos = '';
      this.somatorioReceitas = 0;
      this.somatorioDespesas = 0;

      res.forEach(element => {
        if (element.tipo === 'Recebimento') {
          this.somatorioReceitas = this.somatorioReceitas + element.valor;
          this.recebimentos = this.globalService.converterMoeda(this.somatorioReceitas);
        }
      });

      res.forEach(element => {
        if (element.tipo === 'Pagamento') {
          this.somatorioDespesas = this.somatorioDespesas + element.valor;
          this.pagamentos = this.globalService.converterMoeda(this.somatorioDespesas);
        }
      });
      this.total = this.somatorioReceitas - this.somatorioDespesas;
      this.resultado = this.globalService.converterMoeda(this.total);
    },
    (erro: any) => { this.globalService.loginErrorToast();});
  }

  liberarCampos(){
    this.liberarPesquisaAvancada = !this.liberarPesquisaAvancada;
  }

  pesquisaAvancada(){
    const id = this.globalService.getId();
    const dI = this.globalService.primeiroDia(this.dataInicial);
    const dF = this.globalService.ultimoDia(this.dataFinal);
    this.financeiroListService.pesquisaAvancadaFinanceiro(id, this.tipo, this.recurso, dI, dF).subscribe((res: any)=>{
            this.financeiros = res;
            this.recebimentos = '';
            this.pagamentos = '';
            this.somatorioReceitas = 0;
            this.somatorioDespesas = 0;

            res.forEach(element => {
            if(element.tipo === 'Recebimento'){
              this.somatorioReceitas = this.somatorioReceitas + element.valor;
              this.recebimentos = this.globalService.converterMoeda(this.somatorioReceitas);
            }
            });

            res.forEach(element => {
            if(element.tipo === 'Pagamento'){
              this.somatorioDespesas = this.somatorioDespesas + element.valor;
              this.pagamentos = this.globalService.converterMoeda(this.somatorioDespesas);
            }
            });
            this.total =  this.somatorioReceitas - this.somatorioDespesas;
            this.resultado = this.globalService.converterMoeda(this.total);
      }
    );
    this.liberarPesquisaAvancada = !this.liberarPesquisaAvancada;
  }

  onEdit(id: number){
    this.router.navigate(['financeiro/editar', id]);
  }

  tipoFinanceiro(){
    const dI = this.globalService.primeiroDia(this.data);
    const dF = this.globalService.ultimoDia(this.data);
    this.listarFinanceiro(this.globalService.getId(), dI, dF);
  }

  async pegarData() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Dígite as datas',
      inputs: [
        {
          name: 'dataI',
          type: 'date',
          placeholder: 'Data Inicial'
        },
        {
          name: 'dataF',
          type: 'date',
          placeholder: 'Data Final'
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
            this.pesquisarFinanceiro(this.globalService.primeiroDia(inputs.dataI), this.globalService.ultimoDia(inputs.dataF));
          }
        }
      ]
    });
    await alert.present();
  }

  pesquisarFinanceiro(dataI, dataF){
    const dI = this.globalService.primeiroDia(dataI);
    const dF = this.globalService.ultimoDia(dataF);
    this.listarFinanceiro(this.globalService.getId(), dI, dF);
  }

  async presentAlertConfirm(id, referente){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmar exclusão!',
      message: referente,
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
            this.excluirFinanceiro(id);
          }
        }
      ]
    });
    await alert.present();
  }

  excluirFinanceiro(id: number){
    const dataI = this.globalService.primeiroDia(this.data);
    const dataF = this.globalService.ultimoDia(this.data);
    this.financeiroListService.removeFinanceiro(id).subscribe(
      success=> {
        this.listarFinanceiro(this.globalService.getId(), dataI, dataF);
        this.globalService.removeToast();
       }
    );
  }

}
