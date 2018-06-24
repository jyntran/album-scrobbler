import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'user-root',
  templateUrl: './user.component.html',
  providers: [AuthService]
})

export class UserComponent implements OnInit {
	readonly lastFmBaseURL = 'https://last.fm/user/';
	lastFmURL: string;
	username: string;

	constructor(
		private authService: AuthService
	) {}

	ngOnInit() {
		if (this.authService.isAuthenticated()) {
			this.username = this.authService.getUsername();
			this.lastFmURL = this.lastFmBaseURL + this.username;
		}
	}

	getUsername() {
		return this.authService.getUsername();
	}
}
