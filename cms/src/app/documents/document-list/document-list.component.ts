import { Component, OnInit, OnDestroy} from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { from, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],  
})
export class DocumentListComponent implements OnInit, OnDestroy {
//  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  subscription : Subscription | undefined;
  documents: Document[] = [];
  

  constructor(private documentService : DocumentService) { }

  ngOnInit(): void {
    // TODO: Correct the documents definition
    this.documents = this.documentService.getDocuments();
    this.documentService.documentChangedEvent
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
        }
      );

      this.subscription = this.documentService.documentListChangedEvent
      .subscribe(
        (documentsList: Document[]) =>
        {
          this.documents = documentsList;
        }
      );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
