import { Agenda } from './../../agenda/shared/agenda';
import { take } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaListService {

  private readonly api = `${environment.api}/7475646f61717569/api/listas`;

  constructor(private http: HttpClient) { }

  loadById(id: number){
    return this.http.get(`${this.api}/listarAgendaId/${id}`).pipe(
      take(1)
    );
  }

  listarAgenda(idUsuario: number){
    return this.http.get<Agenda[]>(`${this.api}/listarAgenda/${idUsuario}`).pipe(
      take(1)
    );
  }

  buscaAvancada(data: string){

    const httpParams = new HttpParams()
    .set('data', data);

    const url = this.api + '/buscarAgenda?' + httpParams;

    return this.http.get<Agenda[]>(url).pipe(
      take(1)
    );
  }


  removeAgenda(id: number){
    return this.http.delete(`${this.api}/excluirAgenda/${id}`).pipe(
      take(1)
    );
  }
}
