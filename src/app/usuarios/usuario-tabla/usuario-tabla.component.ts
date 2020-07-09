import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserI } from 'src/app/models/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from '../usuario-dialog/usuario-dialog.component';
import { DepartamentoService } from 'src/app/services/departamento.service';


@Component({
  selector: 'app-usuario-tabla',
  templateUrl: './usuario-tabla.component.html',
  styleUrls: ['./usuario-tabla.component.scss']
})
export class UsuarioTablaComponent implements OnInit {

  dataSource = new MatTableDataSource();
  doc :any;

  displayedColumns: string[] = ['nombre','numero documento','email','telefono','rol','actions'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor( private servicio : UsuarioService,public dialog: MatDialog, private snackBar: MatSnackBar, private departamentoService : DepartamentoService
    ,private _snackBar: MatSnackBar) { }
  
  ngOnInit(): void {

    this.getUsers();
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  openDialog(incident?: UserI): void {
    const config = {
      data: {
        message: incident? 'Editar Usuario' : 'Nuevo Usuario',
        content: incident,
        disableClose: true
      }
    };
    const dialogRef = this.dialog.open(UsuarioDialogComponent,config);
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  getUsers(){
    this.servicio
        .getUsers()
        .subscribe( resp => {this.dataSource.data = resp;

        });
  }

  onNew() {
    this.openDialog();
  }

  onEdit(incident: UserI){
     this.openDialog(incident); 
  }

  onDelete(incident: UserI) {
    this.servicio.deleteUserById(incident);

    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.open("Se elimino el Usuario", "OK", {
      duration: 5000,
    });
  }

  


}
