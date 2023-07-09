import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  private readonly api = `${environment.api}/7475646f61717569/api/painel`;

  constructor(private http: HttpClient) { }

  createTarefa(tarefa: any){
    return this.http.post(`${this.api}/tarefa`, tarefa).pipe(
      take(1)
    );
  }

  updateTarefa(tarefa: any){
    return this.http.put(`${this.api}/alterarTarefa`, tarefa).pipe(
      take(1)
    );
  }
}
