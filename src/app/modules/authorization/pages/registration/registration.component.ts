import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';


import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public registrationForm = new FormGroup({
    login: new FormControl('', [Validators.required], [this.authService.checkLoginValidate('missing')]),
    firstName: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.addUser(this.registrationForm.getRawValue()).subscribe(
      id => {
        console.log(`user add ${id}`);
      }
    );
    this.registrationForm.reset();
  }
}
