import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';;
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Contact[];

  private contactChanged: Subscription;

  constructor(private contactService: ContactService) { }

  ngOnInit(){
    this.contacts = this.contactService.getContacts();
    this.contactChanged = this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      }
    )
  }

  onSelected(contact: Contact){
    this.contactService.contactSelectedEvent.emit(contact);
  }

  ngOnDestroy(): void {
    this.contactChanged.unsubscribe();
  }

}