import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  private socket;
  messages = [];
  currentUser;
  message = "";

  constructor() { }

  ngOnInit() {
    this.socket = io.connect('http://localhost:1337');

    this.socket.on('messageRec', (data) => {
      console.log('messageRec: '+JSON.stringify(data));
      this.messages.push(data);
    })
  }

  sendMessage(message){
    this.currentUser = localStorage.getItem("username");
     var msgObj = {
       sender: localStorage.getItem("username"),
       text: message
     };
     this.socket.emit('messageSend', msgObj);
     this.message = "";
  }

}
