import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioTablaComponent } from './usuarios/usuario-tabla/usuario-tabla.component';
import { UseruploadComponent } from './userupload/userupload.component';


const USER_ROUTES: Routes = [
  /* { path: 'incidents', component: IncidentsComponent }, */
  { path: 'usuarios-table', component: UsuarioTablaComponent },
/*   { path: 'incidents-list', component: IncidentsListComponent },
  { path: 'incidents-list/:texto', component: IncidentsListComponent }
 */
];

const ALL_ROUTES: Routes = [

  { path: 'usuarios', children: USER_ROUTES },
  { path: 'csv', component: UseruploadComponent },


]


/* @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } */

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(ALL_ROUTES);

