import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user:string

  constructor(
    protected authenticationService: AuthenticationService,
    private router: Router,) { }

  ngOnInit(): void {
    this.user = this.authenticationService.currentUserValue.email
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/auth']);
  }
}
