import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DepartamentosService } from './services/departamentos.service';
import { CommonModule } from '@angular/common';
import { DepartamentosComponent } from './ComponenteDepartamento/departamentos/departamentos.component';
import { FuncionariosComponent } from './ComponenteFuncionario/funcionarios/funcionarios.component';
import { FuncionariosService } from './services/funcionarios.service';
import { DashboardComponent } from './ComponentePrincipal/dashboard/dashboard.component';
import { NavComponent } from './ComponenteNavegacao/nav/nav.component';


@NgModule({
  declarations: [
  AppComponent,
  DepartamentosComponent,
  FuncionariosComponent,
  DashboardComponent,
  NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [HttpClientModule, DepartamentosService, FuncionariosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
