import { FinanceiroListService } from './../financeiro-list/shared/financeiro-list.service';
import { FinanceiroService } from './shared/financeiro.service';
import { GlobalService } from './../shared/global.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Financeiro } from './shared/financeiro';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-financeiro',
  templateUrl: './financeiro.page.html',
  styleUrls: ['./financeiro.page.scss'],
})
export class FinanceiroPage implements OnInit {

  id: number;
  indica = '';
  statusPag = false;
  statusRec = false;
  btnSalvar = true;
  btnAtualizar = false;

  financeiroForm = this.fb.group({
      id: [''],
      recurso:[''],
      data: [''],
      tipo: [''],
      referente: [''],
      valor: [''],
      documento: [''],
      descricao: [''],
      vencimento: [''],
      status: [''],
      usuarioId: ['']
  });

  constructor(private fb: FormBuilder,
              private globalService: GlobalService,
              private financeiroService: FinanceiroService,
              private financeiroListService: FinanceiroListService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    const routeParams = this.route.snapshot.params;
    this.findById(routeParams.id);

    this.id = this.globalService.getId();
    this.financeiroForm.patchValue({ usuarioId: this.id });
  }

  salvarFinanceiro(){
    if(this.financeiroForm.valid){
      this.financeiroService.createFinanceiro(this.financeiroForm.value).subscribe(
        success => { this.globalService.saveToast(); }
      );
      this.financeiroForm.reset();
    }
  }

  atualizarFinanceiro(){
    if(this.financeiroForm.valid){
      this.financeiroService.updateFinanceiro(this.financeiroForm.value).subscribe(
        success => { this.globalService.updateToast(); }
      );
      this.financeiroForm.reset();
    }
  }

  direcionar(){
    const escolha = this.financeiroForm.value.tipo;
    if(escolha === 'Recebimento' ){
      this.indica = 'Recebimento';
      this.statusRec = true;
    } else if (escolha === 'Pagamento'){
      this.indica = 'Pagamento';
      this.statusPag = true;
    }
  }

  limpar(){
    this.indica = '';
    this.statusPag = false;
    this.statusRec = false;
  }

  findById(id: number){
    if(id != null){
      this.financeiroListService.listarFinanceiroId(id).subscribe((dados: any)=> {
        this.updateFinanceiroForm(dados);
        this.btnSalvar = false;
        this.btnAtualizar = true;
        if(dados.tipo === 'Recebimento'){
          this.statusRec = true;
        } else if (dados.tipo === 'Pagamento'){
          this.statusPag = true;
        }
      });
    }
  }

  updateFinanceiroForm(financeiro: Financeiro){
    this.financeiroForm.patchValue(financeiro);
  }

}
