import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  login:boolean = false

  constructor() { }

  ngOnInit(): void {
  }

  toggleView(){
    console.log('toggleView', !this.login)
    this.login = !this.login
  }

}
