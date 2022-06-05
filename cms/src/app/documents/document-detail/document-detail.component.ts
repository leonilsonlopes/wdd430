import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Router } from '@angular/router';
import { WindRefService } from '../../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})

export class DocumentDetailComponent implements OnInit {
  nativeWindow: any;
  document!: Document;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private windRefService: WindRefService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          let foundID: string;
          foundID = params['id'];
          let documentFound: Document | null = this.documentService.getDocument(foundID);
          if (documentFound !== null)
            this.document = documentFound;
        }
      );

    this.nativeWindow = this.windRefService.getNativeWindow();
  }

  onView(): void {
    let gotoUrl = this.document.url;
    this.nativeWindow.open(gotoUrl);
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['\documents']);
  }

}
