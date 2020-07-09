import { Injectable } from '@angular/core';
import { UserI } from '../models/user.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  data : UserI;
  private usersCollection: AngularFirestoreCollection<UserI>;
  totalDoc : number ;


  constructor( private firestore : AngularFirestore ) {
    this.usersCollection = firestore.collection<UserI>('com_usuario');
    this.totalUsuarios();
  }

 
  public getUsers():Observable<UserI[]> {

    return this.firestore.collection<UserI>('com_usuario', ref => ref.where('estado_registro', '==', 1))
      .snapshotChanges()
      .pipe(
        map(actions => 
          actions.map(a => {
            const data = a.payload.doc.data() as UserI;
            return data;
          })
        )
      );
  }

  newUser(user: UserI){
    let now : Date = new Date();
    let idDoc = this.totalDoc + 1;
    
    user.fecha_nacimiento = (formatDate(user.fecha_nacimiento,'yyyy-MM-dd', 'en-US', '+0530')).toString();
    user.id_pais = Number(user.id_pais);
    user.id_departamento = Number(user.id_departamento);
    user.nombre_completo = user.nombres +" "+ user.primer_apellido +" "+ user.segundo_apellido;
    
    user.estado_registro = 1;
    user.fecha_modificacion = (formatDate(now,'yyyy-MM-ddTHH:mm:ss.SSSSSS', 'en-US', '+0530')).toString();
    user.fecha_registro = (formatDate(now,'yyyy-MM-ddTHH:mm:ss.SSSSSS', 'en-US', '+0530')).toString();
    user.id_usuario = idDoc;
    user.usuario_modificacion = "carolina";
    user.usuario_registro = "carolina";
    
    this.firestore.collection("com_usuario").doc(idDoc.toString()).set(user);
  }

  editUserById(user: UserI){
    let now : Date = new Date();

    user.fecha_modificacion = (formatDate(now,'yyyy-MM-ddTHH:mm:ss.SSSSSS', 'en-US', '+0530')).toString();
    user.fecha_nacimiento = (formatDate(user.fecha_nacimiento,'yyyy-MM-dd', 'en-US', '+0530')).toString();
    user.nombre_completo = user.nombres +" "+ user.primer_apellido +" "+ user.segundo_apellido;
    user.usuario_modificacion = "carolina";
    user.id_pais = Number(user.id_pais);
    user.id_departamento = Number(user.id_departamento);
 
    this.usersCollection.doc(user.id_usuario.toString()).update(user).then( () => {
        console.log('Usuario Actualizado');
      }).catch( (error) => {
        console.log('Error', 'Mientras se actualizaba el Usuario!!', error);
    });
    
  }

  deleteUserById(user: UserI){
    user.estado_registro = 0;
    user.fecha_modificacion = new Date().toISOString();
    user.usuario_modificacion = "carolina";

    this.usersCollection.doc(user.id_usuario.toString()).update(user).then( () => {
        console.log('Usuario Eliminado');
      }).catch( (error) => {
        console.log('Error', 'Mientras se eliminaba el Usuario', error);
    });

  }

  totalUsuarios() {
    this.firestore.collection('com_usuario').valueChanges ()
           .subscribe (result => {
            this.totalDoc = result.length;
    })
  }

  


}
