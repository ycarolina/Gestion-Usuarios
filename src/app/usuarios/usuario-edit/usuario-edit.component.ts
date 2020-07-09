import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserI } from 'src/app/models/user.interface';
import { PaisService } from 'src/app/services/pais.service';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DepartamentoI } from 'src/app/models/departamento.interface';
import { PaisI } from 'src/app/models/pais.interface';
import { UsuarioDialogComponent } from '../usuario-dialog/usuario-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {

  @Input() user: UserI;
  @Input() doc: any;
  depId: any;
  paises :PaisI[] = []; 
  departamentos :DepartamentoI[] = []; 
  paisSelect :any;
  depSelect :any;
  rolSelect :any;


  constructor( private userService: UsuarioService, private paisService : PaisService, private departamentoService : DepartamentoService,
    private userDialog : UsuarioDialogComponent,private _snackBar: MatSnackBar) {   }

  public UserDialogEditForm = new FormGroup({
    
    nombres: new FormControl('', [Validators.required, Validators.minLength(3)]),
    primer_apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    segundo_apellido: new FormControl('', [Validators.required, Validators.minLength(3)]),
    numero_documento: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nacimiento: new FormControl('', [Validators.required]),
    numero_celular: new FormControl('', [Validators.required, Validators.minLength(3)]),
    correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
    rol: new FormControl('', [Validators.required]),
    id_pais: new FormControl('', [Validators.required]),
    id_departamento: new FormControl('', [Validators.required]),    
  });


  ngOnInit(): void {
  
    this.initValuesForm();  
    this.cargarPais();
    this.paisSelect = this.user.id_pais;
    this.depSelect = this.user.id_departamento;
    this.rolSelect = this.user.rol;

  }

  
  private initValuesForm(): void {
    
    this.UserDialogEditForm.patchValue({
      nombres: this.user.nombres,
      primer_apellido: this.user.primer_apellido,
      segundo_apellido: this.user.segundo_apellido,
      numero_documento: this.user.numero_documento,
      fecha_nacimiento: this.user.fecha_nacimiento,
      numero_celular: this.user.numero_celular,
      correo: this.user.correo,
      rol: this.user.rol,
      id_pais: this.user.id_pais,
      id_departamento: this.user.id_departamento,

    }); 

    
  }


  editUser(incident: any) {
    
    if(incident.valid){
      
      incident.value.estado_registro = this.user.estado_registro,
      incident.value.fecha_modificacion = this.user.fecha_modificacion,
      incident.value.fecha_registro =  this.user.fecha_registro,
      incident.value.id_usuario = this.user.id_usuario,
      incident.value.nombre_completo = this.user.nombre_completo,
      incident.value.usuario_modificacion =  this.user.usuario_modificacion,
      incident.value.usuario_registro =  this.user.usuario_registro,



      this.cerrarDialogo();
      this.userService.editUserById(incident.value);
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
    this._snackBar.open("Se Edito el Usuario", "OK", {
      duration: 5000,
    });
  }

}
