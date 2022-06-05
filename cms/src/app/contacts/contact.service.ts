import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new EventEmitter<Contact[]>();
  Subject: Contact[] = [];
  maxContactId: number;


  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  public getContacts(): Contact[] {
    return this.contacts.slice();
  }

  getContact(id: string) : Contact | null {
    if (!this.contacts) {
      return null;
    }
    
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      } 
    }
    return null;    
  }

  getMaxId(): number {

    let maxId = 0

    for (let contact of this.contacts) {
      let currentId = parseInt(contact.id)
      if (currentId > maxId) maxId = currentId
    }

    return maxId
  }

  addcontact(newcontact: Contact) {
    if ((newcontact === undefined) || (newcontact === null)) {
      return;
    } else {
      this.maxContactId++;

      newcontact.id = this.maxContactId.toString();
      this.contacts.push(newcontact);

      let contactsListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactsListClone);
    }
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if
      ((originalContact === undefined) || (originalContact === null) ||
      (newContact === undefined) || (newContact === null)) {
      return;
    } else {
      const pos = originalContact.id;
      this.contacts[parseInt(pos)] = newContact;

      let contactsListClone = this.contacts.slice();
      this.contactListChangedEvent.next(contactsListClone);
    }
  }

  deleteContact(contact: Contact) {
    if ((contact === undefined) || ((contact === null))) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0)
      return;

    this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }
}
