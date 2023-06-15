import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListarSocioComponent } from './components/listar-socio/listar-socio.component';
import { CrearSocioComponent } from './components/crear-socio/crear-socio.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {path: 'listar-socio', component: ListarSocioComponent},
  { path: 'crear-socio', component: CrearSocioComponent},
  { path: 'editar-socio/:id', component: CrearSocioComponent},
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
