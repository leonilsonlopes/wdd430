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
    this.http.get< {message: string, documents: Documents[]}>('http://localhost:3000/documents')

    .subscribe((documentData) => {

      this.documents = documentData.documents;
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

addDocument(document: Documents) {
  if (!document) {
    return;
  }

  // make sure id of the new Document is empty
  document.id = '';

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // add to database
  this.http.post<{ message: string, document: Documents }>('http://localhost:3000/documents',
    document,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new document to documents
        this.documents.push(responseData.document);
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
}



updateDocument(originalDocument: Documents, newDocument: Documents) {
  if (!originalDocument || !newDocument) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);

  if (pos < 0) {
    return;
  }

  // set the id of the new Document to the id of the old Document
  newDocument.id = originalDocument.id;
 // newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({'Content-Type': 'application/json'});

  // update database
  this.http.put('http://localhost:3000/documents/' + originalDocument.id,
    newDocument, { headers: headers })
    .subscribe(
      (response: Response) => {
        this.documents[pos] = newDocument;
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
}


deleteDocument(document: Documents) {

  if (!document) {
    return;
  }

  const pos = this.documents.findIndex(d => d.id === document.id);

  if (pos < 0) {
    return;
  }

  // delete from database
  this.http.delete('http://localhost:3000/documents/' + document.id)
    .subscribe(
      (response: Response) => {
        this.documents.splice(pos, 1);
        this.documentListChangedEvent.next(this.documents.slice());
      }
    );
}

storeDocuments(): void {
  let json = JSON.stringify(this.documents);
  let header = new HttpHeaders();
  header.set('Content-Type', 'application/json');
  this
  .http
  .put('https://wdd430-leonilsonlopes-default-rtdb.//documents.json', json, {
    headers: header
  }).subscribe(() => {
    this.documentListChangedEvent.next((this.documents.slice()));
  });
}
}




