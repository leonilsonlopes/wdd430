import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  @Input('sent_message') element!: Message;

  messages: Message[] = [
    new Message('1', '', 'The grades for this assignment have been posted', 'Bro. Jackson'),
    new Message('2', '', 'When is assignment 3 due?', 'Steve Johnson'),
    new Message('3', '', 'Assignment 3 is due on Saturday at 11:30 PM', 'Bro. Jackson'),
    new Message('4', '', 'Can i meet with you sometime? I need help with assignment 3', 'Mark Smith'),
    new Message('5', '', 'I can meet with you today at 4:00 PM in my office.', 'Bro. Jackson'),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onAddMessage(message: Message) {
    console.log("AddMessage - EventHandler");
    console.log("message recieved:"+message._msgText);
    this.messages.push(message);
  }

}
