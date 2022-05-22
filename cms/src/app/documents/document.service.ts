import { Injectable, EventEmitter } from '@angular/core';
import { MOCKDOCUMENTS } from '../documents/MOCKDOCUMENTS';
import { Documents } from './document.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  selectedDocumentEvent = new EventEmitter<Documents>();
  private documents: Documents[];

  constructor() { 
   this.documents = MOCKDOCUMENTS;
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

}
