import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceiroService {

  private readonly api = `${environment.api}/7475646f61717569/api/painel`;

  constructor(private http: HttpClient) { }

  createFinanceiro(financeiro: any){
    return this.http.post(`${this.api}/financeiro`, financeiro).pipe(
      take(1)
    );
  }

  updateFinanceiro(financeiro: any){
    return this.http.put(`${this.api}/alterarFinanceiro`, financeiro).pipe(
      take(1)
    );
  }

}
