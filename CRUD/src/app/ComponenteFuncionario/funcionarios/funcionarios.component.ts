import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FuncionariosService } from '../../services/funcionarios.service';
import { Funcionario } from '../../models/Funcionario';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  
  funcionarios: Funcionario[];
  formulario: any;
  tituloFormulario: string;
  verTabela: boolean = true;
  verFormulario: boolean = false;
  modalRef?: BsModalRef;
  nomeFuncionario = '';
  id = '';
  previewUrl: string | ArrayBuffer;
  
  
  constructor(
    private modalService: BsModalService,
    private funcionariosService: FuncionariosService,
    private http: HttpClient
    ) {}
    
    ngOnInit(): void {
      this.funcionariosService.PegarTodosFuncionario().subscribe(resultado =>{
        this.funcionarios = resultado;
        
      });
      
    }
    
    ExibirFormularioCadastro(): void {
      this.verFormulario = true;
      this.verTabela = false;
      this.tituloFormulario = 'Novo(a) Funcionário(a)';
      this.formulario = new FormGroup({
        
        id: new FormControl(null),
        nome: new FormControl(null),
        rg: new FormControl(null),
        foto: new FormControl(null),
        departamentoId: new FormControl(null),
      });
    }
  
    inputFileChange(event: any) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
  
        reader.onload = () => {
          this.previewUrl = reader.result;
        };
  
        reader.readAsDataURL(file);
      }
    }
    ExibirFormularioAtualizacao(id: string): void {
      this.verTabela = false;
      this.verFormulario = true;
      this.funcionariosService.PegarFuncionarioId(id).subscribe(resultado =>{
        this.tituloFormulario = `Atualizar ${resultado.nome}`;
        this.formulario = new FormGroup({
          id: new FormControl(resultado.id),
          nome: new FormControl(resultado.nome),
          rg: new FormControl(resultado.rg),
          foto: new FormControl(resultado.foto),
          departamentoId: new FormControl(resultado.departamentoId)
        });
      });
    }
    EnviarFormulario(): void {
      console.log(this.formulario)
      const funcionario: Funcionario = this.formulario.value;
      if (parseInt(funcionario.id, 10) > 0)
      {
        this.funcionariosService.AtualizarFuncionario(funcionario).subscribe({
          next: (resultado) => {
            this.verTabela = true;
            this.verFormulario = false;
            alert('Funcionário(a) atualizado(a) com sucesso');
            this.funcionariosService.PegarTodosFuncionario().subscribe(registros =>{
              this.funcionarios = registros;
            });
          },
        });
      } else {
        this.funcionariosService.SalvarFuncionario(funcionario).subscribe({
          next: (resultado) => {
            this.verTabela = true;
            this.verFormulario = false;
            alert('Funcionário(a) inserido(a) com sucesso');
            this.funcionariosService.PegarTodosFuncionario().subscribe(registros =>{
              this.funcionarios = registros;
            });
          },
          error: (erro) => {
            console.error('Erro ao salvar o(a) funcionário(a):', erro);
            alert('Ocorreu um erro ao salvar o(a) funcionário(a).');
          }      
        });
      }
    }
    Voltar(): void {
      this.verTabela = true;
      this.verFormulario = false;
    }
    
    ExibirConfirmacaoExclusao(id: string, nomeFuncionario: string, conteudoModal: TemplateRef<any>): void {
      this.modalRef = this.modalService.show(conteudoModal)
      this.id = id;
      this.nomeFuncionario = nomeFuncionario;
    }
    ExcluirFuncionario(id: string){
      this.funcionariosService.ExcluirFuncionario(id).subscribe(resultado => {
        this.modalRef?.hide();
        alert('Departamento excluído com sucesso');
        this.funcionariosService.PegarTodosFuncionario().subscribe(registros =>{
          this.funcionarios = registros;
        });
      });
    }
    
    
  }
  