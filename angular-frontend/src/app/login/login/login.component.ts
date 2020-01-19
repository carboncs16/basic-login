import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginData: FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder
  ) {
    this.loginData = fb.group({
      email: [''],
      password: ['']
    });
  }


  ngOnInit() {
  }

  login(event) {
    console.log(event)
    this.loginService.login(this.loginData.value)
      .subscribe(res => {
        console.log(res);

      })
  }

}
