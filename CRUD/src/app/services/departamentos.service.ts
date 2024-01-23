import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Departamento } from '../models/Departamento';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  url = "http://localhost:5000/api/departamento";
  constructor(private http: HttpClient) { }
  
  SalvarDepartamento(departamento: Departamento) {
    console.log(departamento)
    departamento.id = "0";
    return this.http.post(this.url, departamento);
  }
  PegarTodosDepartamento(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.url);
  }
  PegarDepartamentoId(id: string): Observable<Departamento> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Departamento>(apiUrl);
  }
  AtualizarDepartamento(departamento: Departamento) : Observable<any> {
    return this.http.put<Departamento>(this.url, departamento, HttpOptions)
  }
  ExcluirDepartamento(id: string) : Observable<any> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<string>(apiUrl, HttpOptions)
  }
}
