import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalDataService {
  private funcionariosSource = new BehaviorSubject<any[]>([]);
  funcionarios = this.funcionariosSource.asObservable();

  constructor() {}

  atualizarFuncionarios(funcionarios: any[]): void {
    this.funcionariosSource.next(funcionarios);
  }
}
