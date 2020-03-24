import { Component, OnInit } from '@angular/core'
import {FormGroup, FormControl, Validators} from '@angular/forms'
import { Router } from '@angular/router'
import { first } from 'rxjs/operators'
import { AuthenticationService } from '../authentication.service'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup
  submitted = false
  loading = false
  error:string

  constructor(
    protected authenticationService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    })
  }

  get f() { return this.signinForm.controls; }

  submit(){
    this.submitted = true;
      if (this.signinForm.invalid) {
        return;
      }
      this.loading = true
      this.authenticationService
      .signup({...this.signinForm.value})
      .pipe(first())
      .subscribe(
          data => {
              this.router.navigate(['']);
              console.log(data)
          },
          error => {
            this.error = 'Error! Try again later'
            this.loading = false
          });
    }

}