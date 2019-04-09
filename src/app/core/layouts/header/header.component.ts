import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // public isLogin = false;
  public login$: Observable<boolean>;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.login$ = this.authService.getIsLoginIn();
    // this.isLogin = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }

}
