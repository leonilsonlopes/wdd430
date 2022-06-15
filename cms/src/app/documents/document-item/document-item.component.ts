import { Component, OnInit, Input } from '@angular/core';
import { Documents } from '../document.model'

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {
  @Input() document: Documents;

  constructor() { }

  ngOnInit(): void {
  }

}