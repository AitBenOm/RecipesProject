import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    const email = form.value.email;
    const pwd = form.value.pwd;
    this.authService.signinUser(email, pwd);
    this.router.navigate(['recipes']);
    console.log('recipes');
  }
}
