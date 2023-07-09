import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  private readonly api = `${environment.api}/7475646f61717569/api/painel`;

  constructor(private http: HttpClient) { }


  createAgenda(agenda: any){
    return this.http.post(`${this.api}/agenda`, agenda).pipe(
      take(1)
    );
  }

  updateAgenda(agenda: any){
    return this.http.put(`${this.api}/alterarAgenda`, agenda).pipe(
      take(1)
    );
  }

}
