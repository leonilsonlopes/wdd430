import { Injectable, EventEmitter } from '@angular/core';
import { Documents } from './document.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DocumentService{
  
  documents: Documents[];
  selectedDocumentEvent = new EventEmitter<Documents>();
  documentChangedEvent: EventEmitter<Documents[]> = new EventEmitter<Documents[]>();
  documentListChangedEvent: Subject<Documents[]> = new Subject<Documents[]>();
  maxDocumentId: number;
  
  constructor(private http: HttpClient) { 
   this.getDocuments();
  }

  getDocuments():void {
    this
    .http
    .get('https://wdd430-leonilsonlopes-default-rtdb.firebaseio.com/documents.json').subscribe((documents: Documents[]) => {
      this.documents = documents;
      this.maxDocumentId = this.getMaxId();
      this.documents.sort((lhs: Documents, rhs: Documents): number => {
        if (lhs.id < rhs.id) {
          return -1;
        } else if (lhs.id === rhs.id) {
          return 0;
        } else {
          return 1;
        }
      });
      this.documentListChangedEvent.next(this.documents.slice());
    }, (err: any) => {
      console.error(err);
    });
  }


  getDocument(id: string): Documents{

    if(!this.documents){
      return null;
    }

    for(let document of this.documents){
      if (document.id === id){
        return document;
      }
    }
    return null;
  }


getMaxId(): number {
  let maxId = 0;
  
  for(let document of this.documents ){
    let currentId = +document.id;
    
    if(currentId > maxId){
      maxId = currentId;
    }
  } 
  return maxId;
}


addDocument(newDocument: Documents){
  if(newDocument == undefined || newDocument == null){
    return
  }
  this.maxDocumentId++;
  newDocument.id = (this.maxDocumentId).toString();
  this.documents.push(newDocument);
  this.storeDocuments();
}

updateDocument(originalDocument: Documents, newDocument: Documents): void{
  if(!originalDocument || !newDocument){
    return;
  }

  let pos = this.documents.indexOf(originalDocument);
  
  if (pos < 0){
    return;
  } 

  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  this.storeDocuments();

}

deleteDocument(document: Documents): void{
  if(!document){
    return;
  }

  let pos = this.documents.indexOf(document);

  if(pos < 0) {
    return;
  }

  this.documents.splice(pos, 1);
  this.storeDocuments();
}

storeDocuments(): void {
  let json = JSON.stringify(this.documents);
  let header = new HttpHeaders();
  header.set('Content-Type', 'application/json');
  this
  .http
  .put('https://wdd430-leonilsonlopes-default-rtdb.firebaseio.com/documents.json', json, {
    headers: header
  }).subscribe(() => {
    this.documentListChangedEvent.next((this.documents.slice()));
  });
}
}


