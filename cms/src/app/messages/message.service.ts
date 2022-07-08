import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';

import { Message } from './message.model';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messagesChanged = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) { 
    this.getMessagesUrl();
  }

  getMessagesUrl(){
    this.http.get('http://localhost:3000/messages')

    .subscribe((messages: Message[]) => {

      this.messages = messages;
      this.maxMessageId = this.getMaxId();
      
      this.messages.sort((lhs: Message, rhs: Message): number => {
      if (lhs.id < rhs.id) {
        return -1;
      } else if(lhs.id === rhs.id) {
        return 0;
      } else {
        return 1;
      }
    });
    
    this.messagesChanged.next(this.messages.slice());
  }, (err: any) => {
    console.error(err);
  });
}

  getMessages(){
    return this.messages.slice();
  }

  getMessage(id: string) {
    for(let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }


  

  addMessage(message: Message) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: String; newMessage: Message }>(
        'http://localhost:3000/messages',
        message,
        { headers: headers }
      )
      .subscribe((responseData) => {
        this.messages.push(responseData.newMessage);
        this.messagesChanged.emit(this.messages.slice());
      });

  }


  getMaxId(): number {
    let maxId = 0;
    for (let message of this.messages) {
      let currentID = +message.id;
      if (currentID > maxId) {
        maxId = currentID;
      }
    }

    return maxId;
  }

  storeMessages(): void{
    let json = JSON.stringify(this.messages);
    let header = new HttpHeaders();
    header.set('Content-Type', 'application/json');
    this.http.put('https://wdd430-leonilsonlopes-default-rtdb./messages.json', json, {
      headers: header
    }).subscribe( () =>{
      this.messagesChanged.next( (this.messages.slice()) )
    } );

  }
}
