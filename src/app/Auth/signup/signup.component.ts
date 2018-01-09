import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    const email = form.value.email;
    const pwd = form.value.pwd;
    this.authService.signupUser(email, pwd);
    this.router.navigate(['recipes']);
    console.log('recipes');
  }
}
