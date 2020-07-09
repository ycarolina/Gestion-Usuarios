import { Component, OnInit} from '@angular/core';
import { Csv2fireService } from '../services/csv2fire.service';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userupload',
  templateUrl: './userupload.component.html',
  styleUrls: ['./userupload.component.scss']
})
export class UseruploadComponent implements OnInit {

  message = 'Uploading';
  showMessage: boolean = false;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  isUploading: boolean;
  isUploaded: boolean;


  

  constructor(private storage: AngularFireStorage, private csv2fire: Csv2fireService) {}

  
  ngOnInit(): void {
    this.isUploading = false;
    this.isUploaded = false;
  }


  
  startUpload(event: FileList) {
    const file = event.item(0);
    if(file.type.split('/')[1] !== 'csv') {
    console.error('Unsupported file type!!');
    }
    this.isUploading = true;
    this.isUploaded = false;
    this.csv2fire.process(file, 'data');
  }


  

}
