import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { PaisI } from '../models/pais.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  data : PaisI;
  private usersCollection: AngularFirestoreCollection<PaisI>;


  constructor( private firestore : AngularFirestore ) {
    this.usersCollection = firestore.collection<PaisI>('com_usuario');
  }



  public getPaises():Observable<PaisI[]> {

    return this.firestore.collection<PaisI>('com_pais', ref => ref.where('estado_registro', '==', 1))
      .snapshotChanges()
      .pipe(
        map(actions => 
          actions.map(a => {
            const data = a.payload.doc.data() as PaisI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }
}
