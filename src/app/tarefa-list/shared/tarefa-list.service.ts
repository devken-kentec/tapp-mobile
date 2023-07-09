import { take } from 'rxjs/operators';
import { Tarefa } from './../../tarefa/shared/tarefa';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarefaListService {

  private readonly api = `${environment.api}/7475646f61717569/api/listas`;

  constructor(private http: HttpClient) { }

  listarTarefa(idUsuario: number){
    return this.http.get<Tarefa[]>(`${this.api}/listarTarefa/${idUsuario}`).pipe(
      take(1)
    );
  }

  listarTarefaId(id: number){
    return this.http.get(`${this.api}/listarTarefaId/${id}`).pipe(
      take(1)
    );
  }

  buscaAvancada(data: string){

    const httpParams = new HttpParams()
    .set('data', data);

    const url = this.api + '/buscarTarefa?' + httpParams;

    return this.http.get<Tarefa[]>(url).pipe(
      take(1)
    );
  }

  removeTarefa(id: number){
    return this.http.delete(`${this.api}/excluirTarefa/${id}`).pipe(
      take(1)
    );
  }
}
