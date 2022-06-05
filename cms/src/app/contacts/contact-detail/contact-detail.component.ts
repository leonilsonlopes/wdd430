import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';


@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})

export class ContactDetailComponent implements OnInit {
  contact!: Contact;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          let foundID: string;
          foundID = params['id'];
          let contactFound: Contact | null = this.contactService.getContact(foundID);
          if (contactFound !== null)
            this.contact = contactFound;
        }
      );
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['\contacts']);
  }

}
