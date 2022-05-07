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
    new Message('1', 'Testing 1', 'Testing to confirm that a message is displayed', 'Pearl G.'),
    new Message('2', 'Testing 2', 'Testing to confirm that a message is displayed', 'Pearl G.'),
    new Message('3', 'Testing 3', 'Testing to confirm that a message is displayed', 'Pearl G.'),
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
