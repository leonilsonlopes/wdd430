import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Ford', 'Ford Cougar', 'https://en.wikipedia.org/wiki/Ford_Cougar', undefined),
    new Document('2', 'Fiat', 'Fiat Uno', 'https://en.wikipedia.org/wiki/Fiat_Uno', undefined),
    new Document('3', 'BMW', 'BMW Series 3', 'https://en.wikipedia.org/wiki/BMW_3_Series', undefined),
    new Document('4', 'Volkswagen', 'Volkswagen Beetle', 'https://en.wikipedia.org/wiki/Volkswagen_Beetle', undefined),
    new Document('5', 'Renault', 'Renault/Dacia Sandero', 'https://en.wikipedia.org/wiki/Dacia_Sandero', undefined)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}

