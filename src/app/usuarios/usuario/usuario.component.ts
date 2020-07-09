
import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/models/user.interface';
import { PaisService } from 'src/app/services/pais.service';
import { PaisI } from 'src/app/models/pais.interface';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DepartamentoI } from 'src/app/models/departamento.interface';
import { Observable } from 'rxjs';
import { UsuarioDialogComponent } from '../usuario-dialog/usuario-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  paises :PaisI[] = []; 
  departamentos :DepartamentoI[] = []; 
  depId: any;

  constructor( private userService: UsuarioService, private paisService : PaisService, private departamentoService : DepartamentoService,
    private userDialog : UsuarioDialogComponent,private _snackBar: MatSnackBar) { }


  public UserDialogEditForm = new FormGroup({
    nombres: new FormControl('', [Validators.required, Validators.minLength(3)]),
    primer_apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    segundo_apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    numero_documento: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nacimiento: new FormControl('', [Validators.required, Validators.minLength(3)]),
    numero_celular: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    rol: new FormControl('', [Validators.required]),
    id_pais: new FormControl('', [Validators.required]),
    id_departamento: new FormControl('', [Validators.required]),    

  });

    

  ngOnInit(): void {
    this.cargarPais(); 
  }


  
  addNewUser(data: any) {

    if(data.valid){
      this.cerrarDialogo();
      this.userService.newUser(data.value);
      this.openSnackBar();
    }
  }

  
  
  cargarPais(){
    this.paisService.getPaises()
        .subscribe( resp => {
          this.paises = resp;
        });
  }
 

  cargarDep(idPais : any) {
    if(idPais.isUserInput) {
      this.depId  = Number(idPais.source.value); 
      this.departamentoService
        .getDepartamentos(this.depId)
        .subscribe(resp => {
          this.departamentos = resp;
      });             
    }
  }

  cerrarDialogo(){
    this.userDialog.closeDialog();
  }

 
  
  openSnackBar() {
    this._snackBar.open("Se guardo Usuario correctamente", "OK", {
      duration: 5000,
    });
  }

  

}
