import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login = new FormControl(
    '',
    [Validators.required],
    [this.authService.checkLoginValidate('exists')]
  );

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
  }

}
