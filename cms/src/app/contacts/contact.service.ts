import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Contact } from './contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();
  contactChangedEvent: EventEmitter<Contact[]> = new EventEmitter<Contact[]>();
  contactListChangedEvent: Subject<Contact[]> = new Subject<Contact[]>();
  maxContactID: number;

  constructor(private http: HttpClient) { 
    this.getContacts();
  }

  getContacts(): void {this.http
    .get<{message: string, contacts: Contact[]}>('http://localhost:3000/contacts')
    .subscribe((contactData) => {
      this.contacts = contactData.contacts;
      this.maxContactID = this.getMaxID();
      this.contacts.sort((lhs: Contact, rhs: Contact): number => {
        if (lhs.id < rhs.id) {
          return -1;
        } else if (lhs.id === rhs.id) {
          return 0;
        } else {
          return 1;
        }
      });
      this.contactListChangedEvent.next(this.contacts.slice());
    }, (err: any) => {
      console.error(err);
    });
  }

  getContact(id: string): Contact {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }

    return null;
  }

  getMaxID(): number {
    let maxID = 0;
    for (let contact of this.contacts) {
      let currentID = +contact.id;
      if (currentID > maxID) {
        maxID = currentID;
      }
    }

    return maxID;
  }

  addContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // make sure id of the new Document is empty
    contact.id = '';


    // add to database
    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.contacts.push(responseData.contact);
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }



 
  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newContact.id = originalContact.id;
    //newContact._id = originalContact._id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
    newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.contactListChangedEvent.next(this.contacts.slice());
        }
      );
  }






  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.http
      .delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(() => {
        this.contacts.splice(pos, 1);
        let contactsListClone = this.contacts.slice();
        this.contactListChangedEvent.next(contactsListClone);
      });

  }

  storeContacts(): void {
    let json = JSON.stringify(this.contacts);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this
    .http
    .put('https://wdd430-leonilsonlopes-default-rtdb.//contacts.json', json, {
      headers: header
    }).subscribe(() => {
      this.contactListChangedEvent.next((this.contacts.slice()));
    });
  }
}