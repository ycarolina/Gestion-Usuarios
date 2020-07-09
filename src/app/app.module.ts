import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouting } from './app-routing.module';

//angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatGridListResponsiveModule } from './material/mat-grid-list-responsive/mat-grid-list-responsive.module';

//firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { environment } from 'src/environments/environment';


//formulario
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
//componentes usuario
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { UsuarioTablaComponent } from './usuarios/usuario-tabla/usuario-tabla.component';
import { UsuarioDialogComponent } from './usuarios/usuario-dialog/usuario-dialog.component';
import { UsuarioEditComponent } from './usuarios/usuario-edit/usuario-edit.component';
import { DatePipe } from '@angular/common';
import { DropzoneDirective } from './dropzone.directive';
import { UseruploadComponent } from './userupload/userupload.component';


@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    UsuarioTablaComponent,
    UsuarioDialogComponent,
    UsuarioEditComponent,
    UsuarioComponent,
    DropzoneDirective,
    UseruploadComponent
  ],
  imports: [
    AppRouting,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    MatGridListResponsiveModule,
    ReactiveFormsModule,


    
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
