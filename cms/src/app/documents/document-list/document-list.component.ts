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
  subscription: Subscription;

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.documentChangedEvent.subscribe((documents: Documents[]) =>{
      this.documents = documents.slice();
    });

    this.subscription = this.documentService.documentListChangedEvent.subscribe((documents: Documents[]) =>{
      this.documents = documents;
    });

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }


}
