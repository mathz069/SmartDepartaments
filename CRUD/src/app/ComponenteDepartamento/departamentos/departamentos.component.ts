import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Departamento } from '../../models/Departamento';
import { DepartamentosService } from '../../services/departamentos.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal'
import { ModalDataService } from '../../shared/modal-data.service';
import { Funcionario } from '../../models/Funcionario';
import { FuncionariosService } from '../../services/funcionarios.service';
@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  funcionarios: Funcionario[];
  formulario: any;
  tituloFormulario: string;
  departamentos: Departamento[];
  verTabela: boolean = true;
  verFormulario: boolean = false;
  nomeDepartamento = '';
  id = '';
  modalRef?: BsModalRef;
  departamentoId = '';
  constructor
  (
    private departamentosService: DepartamentosService,
    private modalService: BsModalService,
    private modalDataService: ModalDataService,
    private funcionariosService: FuncionariosService
    ) {}
    
    ngOnInit(): void {
      
      this.departamentosService.PegarTodosDepartamento().subscribe(resultado =>{
        this.departamentos = resultado;
      });
      
    }
    ExibirFuncionariosDepartamento(departamentoId: string, Funcionarios: TemplateRef<any>): void {
      console.log('Chamando ExibirFuncionariosDepartamento com departamentoId:', departamentoId);
      const idDepartamento: number = parseInt(departamentoId, 10);
      console.log(idDepartamento)
      if (!isNaN(idDepartamento)) {
        
        this.funcionariosService.PegarFuncionarioDepartamento(idDepartamento)
        .subscribe((funcionarios) => {
          console.log('Funcionários obtidos:', funcionarios);
          this.funcionarios = funcionarios;
          this.modalDataService.atualizarFuncionarios(funcionarios);
          this.modalRef = this.modalService.show(Funcionarios, { class: 'modal-lg' });
        });
      } else {
        console.error('ID do departamento não é um número válido.');
      }
    }
    
    FecharModal(): void {
      this.modalRef.hide();
    }
    
    ExibirFormularioCadastro(): void {
      this.verFormulario = true;
      this.verTabela = false;
      this.tituloFormulario = 'Novo Departamento';
      this.formulario = new FormGroup({
        
        id: new FormControl(null),
        nome: new FormControl(null),
        sigla: new FormControl(null)
      });
    }
    ExibirFormularioAtualizacao(id: string): void {
      this.verTabela = false;
      this.verFormulario = true;
      this.departamentosService.PegarDepartamentoId(id).subscribe(resultado =>{
        this.tituloFormulario = `Atualizar ${resultado.nome}`;
        
        this.formulario = new FormGroup({
          id: new FormControl(resultado.id),
          nome: new FormControl(resultado.nome),
          sigla: new FormControl(resultado.sigla)
        });
      });
    }
    EnviarFormulario(): void {
      console.log(this.formulario)
      const departamento: Departamento = this.formulario.value;
      if (parseInt(departamento.id, 10) > 0)
      {
        this.departamentosService.AtualizarDepartamento(departamento).subscribe({
          next: (resultado) => {
            this.verTabela = true;
            this.verFormulario = false;
            alert('Departamento atualizado com sucesso');
            this.departamentosService.PegarTodosDepartamento().subscribe(registros =>{
              this.departamentos = registros;
            });
          },
        });
      } else {
        this.departamentosService.SalvarDepartamento(departamento).subscribe({
          next: (resultado) => {
            this.verTabela = true;
            this.verFormulario = false;
            alert('Departamento inserido com sucesso');
            this.departamentosService.PegarTodosDepartamento().subscribe(registros =>{
              this.departamentos = registros;
            });
          },
          error: (erro) => {
            console.error('Erro ao salvar departamento:', erro);
            alert('Ocorreu um erro ao salvar o departamento.');
          }      
        });
      }
    }
    Voltar(): void {
      this.verTabela = true;
      this.verFormulario = false;
    }
    ExibirConfirmacaoExclusao(id: string, nomeDepartamento: string, conteudoModal: TemplateRef<any>): void {
      this.modalRef = this.modalService.show(conteudoModal)
      this.id = id;
      this.nomeDepartamento = nomeDepartamento;
    }
    ExcluirDepartamento(id: string){
      this.departamentosService.ExcluirDepartamento(id).subscribe(resultado => {
        this.modalRef?.hide();
        alert('Departamento excluído com sucesso');
        this.departamentosService.PegarTodosDepartamento().subscribe(registros =>{
          this.departamentos = registros;
        });
      });
    }
  }
  