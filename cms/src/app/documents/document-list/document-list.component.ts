import { Component, OnDestroy, OnInit} from '@angular/core';
import { Documents } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Documents[] = [];

  private documentListChangedEvent: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documents = this.documentService.getDocuments();
    this.documentListChangedEvent = this.documentService.documentListChangedEvent.subscribe(
      (documents: Documents[]) =>{
        this.documents = documents;
      }
    )
  }

  ngOnDestroy(): void{
    this.documentListChangedEvent.unsubscribe();
  }


}
