import { Component,  OnInit, OnDestroy } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { from, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']  
})

export class ContactListComponent implements OnInit, OnDestroy {
  
  subscription : Subscription | undefined;
  contacts: Contact[] = [];

  constructor(private contactService : ContactService) { 
  }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent
      .subscribe(
        (contacts: Contact[]) => {
          this.contacts = contacts;
        }
      );

      this.subscription = this.contactService.contactListChangedEvent
      .subscribe(
        (contactsList: Contact[]) =>
        {
          this.contacts = contactsList;
        }
      );
  }  

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
