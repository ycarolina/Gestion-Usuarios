import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DepartamentoI } from '../models/departamento.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  data : DepartamentoI;
  private usersCollection: AngularFirestoreCollection<DepartamentoI>;


  constructor( private firestore : AngularFirestore ) { 
    this.usersCollection = firestore.collection<DepartamentoI>('com_departamento');

  }

  public getDepartamentos(id: number):Observable<DepartamentoI[]> {

    return this.firestore.collection<DepartamentoI>('com_departamento', ref => ref.where('id_pais', '==', id))
               .snapshotChanges()
               .pipe(
                map(actions => 
                  actions.map(a => {
                    const data = a.payload.doc.data() as DepartamentoI;
                    const id = a.payload.doc.id;
                    return { id, ...data};

                  })
                )
              );
  }

}
