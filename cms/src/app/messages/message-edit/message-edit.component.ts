import { Component, Directive, Input, OnInit, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  @ViewChild('subject', {static: true}) ref_subject!: ElementRef;
  @ViewChild('message', {static: true}) ref_msgText!: ElementRef;  
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender : string = "Graham Pearl";

  constructor() {    
  }

  ngOnInit(): void {
  }

  onClear() {
    this.ref_subject.nativeElement.value = '';
    this.ref_msgText.nativeElement.value = '';
  }

  onSendMessage() {
    let the_subject = (String)(this.ref_subject.nativeElement.value);
    let the_msgText = (String)(this.ref_msgText.nativeElement.value); 
    
    this.addMessageEvent.emit(new Message('1', ''+the_subject, ''+the_msgText,this.currentSender));
  }
  
}
