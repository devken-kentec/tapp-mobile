import { take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Financeiro } from 'src/app/financeiro/shared/financeiro';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroListService {

  private readonly api = `${environment.api}/7475646f61717569/api/listas`;

  constructor(private http: HttpClient) { }

  listarFinanceiro(idUsuario: number, dataI: string, dataF: string){
    return this.http.get<Financeiro[]>(`${this.api}/listarFinanceiro/${idUsuario}/${dataI}/${dataF}`).pipe(
      take(1)
    );
  }

  listarFinanceiroId(id: number){
    return this.http.get(`${this.api}/listarFinanceiroId/${id}`).pipe(
      take(1)
    );
  }

  pesquisaAvancadaFinanceiro(id: number, tipo: string, recurso: string, dataInicial: string, dataFinal: string){
    const httpParams = new HttpParams()
      .set('id', id)
      .set('tipo', tipo)
      .set('recurso', recurso)
      .set('dataInicial', dataInicial)
      .set('dataFinal', dataFinal);

      const url = this.api+'/pesquisaAvancadaFinanceiro?'+ httpParams;

    return this.http.get<Financeiro[]>(url).pipe(
      take(1)
    );
  }

  removeFinanceiro(id: number){
    return this.http.delete(`${this.api}/excluirFinanceiro/${id}`).pipe(
      take(1)
    );
  }

}
