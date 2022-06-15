import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS';
import { Documents } from './document.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  selectedDocumentEvent = new EventEmitter<Documents>();
  private documents: Documents[];

  documentListChangedEvent = new Subject<Documents[]>();
  private maxDocumentId: number;

  constructor() { 
   this.documents = MOCKDOCUMENTS;
   this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string){
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
  this.documentListChangedEvent.next(this.documents.slice());
}

updateDocument(originalDocument: Documents, newDocument: Documents){
  if(!originalDocument || !newDocument){
    return;
  }

  let pos = this.documents.indexOf(originalDocument);
  
  if (pos < 0){
    return;
  } 

  newDocument.id = originalDocument.id;
  this.documents[pos] = newDocument;
  let documentsListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentsListClone);

}

deleteDocument(document: Documents){
  if(!document){
    return;
  }

  let pos = this.documents.indexOf(document);

  if(pos < 0) {
    return;
  }

  this.documents.splice(pos, 1);
  let documentListClone = this.documents.slice();
  this.documentListChangedEvent.next(documentListClone);
}

}
