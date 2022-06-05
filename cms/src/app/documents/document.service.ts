import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new EventEmitter<Document[]>();
  Subject: Document[] = [];
  maxDocumentId: number;

  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  public getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    if (!document) {
      return null;
    }

    for (let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }

    return null;
  }

  getMaxId(): number {

    let maxId = 0

    for (let document of this.documents) {
      let currentId = parseInt(document.id)
      if (currentId > maxId) maxId = currentId
    }

    return maxId
  }

  addDocument(newDocument: Document) {
    if ((newDocument === undefined) || (newDocument === null)) {
      return;
    } else {
      this.maxDocumentId++;

      newDocument.id = this.maxDocumentId.toString();
      this.documents.push(newDocument);

      let documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
    }
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if
      ((originalDocument === undefined) || (originalDocument === null) ||
      (newDocument === undefined) || (newDocument === null)) {
      return;
    } else {
      const pos = originalDocument.id;
      this.documents[parseInt(pos)] = newDocument;

      let documentsListClone = this.documents.slice();
      this.documentListChangedEvent.next(documentsListClone);
    }
  }

  deleteDocument(document: Document) {
    if ((document === undefined) || ((document === null))) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0)
      return;

    this.documents.splice(pos, 1);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }

}
