import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/Funcionario';

const HttpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class FuncionariosService {
  url = "http://localhost:5000/api/funcionario";
  constructor(private http: HttpClient ) { }
  
  SalvarFuncionario (funcionario: Funcionario) {
    console.log(funcionario)
    funcionario.id = "0";
    return this.http.post(this.url, funcionario);
  }
  PegarTodosFuncionario(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.url);
  }
  PegarFuncionarioId(id: string): Observable<Funcionario> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Funcionario>(apiUrl);
  }
   PegarFuncionarioDepartamento(departamentoId: number): Observable<any> {
    return this.http.get(`${this.url}/por-departamento/${departamentoId}`);
  }
  AtualizarFuncionario(funcionario: Funcionario) : Observable<any> {
    return this.http.put<Funcionario>(this.url, funcionario, HttpOptions)
  }
  ExcluirFuncionario(id: string) : Observable<any> {
    const apiUrl = `${this.url}/${id}`;
    return this.http.delete<string>(apiUrl, HttpOptions)
  }
}

