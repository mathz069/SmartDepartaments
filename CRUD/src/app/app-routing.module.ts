import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './ComponentePrincipal/dashboard/dashboard.component';
import { DepartamentosComponent } from './ComponenteDepartamento/departamentos/departamentos.component';
import { FuncionariosComponent } from './ComponenteFuncionario/funcionarios/funcionarios.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'departamento', component: DepartamentosComponent},
  {path: 'funcionario', component: FuncionariosComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
