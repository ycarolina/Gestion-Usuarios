import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as Papa from 'papaparse';
import * as _ from 'lodash';
import { UserI } from '../models/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class Csv2fireService {

  
  private usersCollection: AngularFirestoreCollection<UserI>;

  
  csv_rec: any[] = [];
  header = false;

  constructor(private afs: AngularFirestore,private _snackBar: MatSnackBar) { }

  process(file, collection) {
    Papa.parse(file, {
      complete: res => {
      this.csv_rec = res;
      this.firethis(this.csv_rec['data'], collection);
      },
      header: true
    });
  }

  /* Si el documento no existe, se creará. Si el documento existe, 
  su contenido se sobrescribirá con los datos proporcionados. */
  firethis(json, collection) {
    console.log(json);
    json = this.tamanioJson(json);
    console.log(json);
    let idDoc = '';
    return new Promise((resolve) => {
        _.map(json, (e, i) => {
          _.keys(e).map(() => {
            idDoc = (e.id_usuario).toString();
            this.afs.collection("com_usuario").doc(idDoc).set(e)
          .then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });
          })
        })
        resolve();
    })
  }

  tamanioJson(json){
    let usersJson :any[] =[];
    let objeto :any;
    for (let index = 0; index < json.length-1; index++) {
      objeto = this.darFormato(json[index]);
      usersJson.push(objeto);
    }
    return usersJson;
  }

  openSnackBar(mensaje : string) {
    this._snackBar.open(mensaje, "OK", {
      duration: 5000,
    });
  }

  darFormato(obj : any){
    //estado_registro 
    obj.estado_registro = Number(obj.estado_registro); 
    //id_departamento
    obj.id_departamento = Number(obj.id_departamento); 
    //id_pais
    obj.id_pais = Number(obj.id_pais); 
    //id_usuario
    obj.id_usuario = Number(obj.id_usuario); 
    return obj;
  }

  

}