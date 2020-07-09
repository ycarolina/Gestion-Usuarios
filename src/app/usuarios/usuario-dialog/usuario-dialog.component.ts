import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.scss']
})
export class UsuarioDialogComponent implements OnInit {

  

  constructor(public dialog: MatDialogRef<UsuarioDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any) {

      dialog.disableClose = true;
  }

  ngOnInit(): void {
  }


  closeDialog(){
    
    this.dialog.close();
  }

}
