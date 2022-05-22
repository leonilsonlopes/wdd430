import { Component, Input, OnInit } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers: [ ContactService ]
})

export class ContactsComponent implements OnInit {
  @Input()
  selectedContact!: Contact;

  constructor(private contactService : ContactService) { }

  ngOnInit(): void {
    //alert('Responding to Contact selected');    
    this.contactService.contactSelectedEvent
    .subscribe(
            
      (contact: Contact) => { 
                
        this.selectedContact = contact; 

      }      
    )
  }

}
