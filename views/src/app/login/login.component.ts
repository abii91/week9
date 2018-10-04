import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    username: ""
  };
  errorMessage = "";

  constructor(private router: Router) { }

  ngOnInit() {
  }


  logIn(user) {
    if(user.username === ""){
      this.errorMessage = "Please enter your name";
      return;
    }
    this.errorMessage = "";
    localStorage.setItem("username", user.username);
    this.router.navigate(['/chat']);
  }

}
