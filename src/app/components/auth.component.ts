import { Component, OnInit, Input } from '@angular/core';
import { LastFmService } from '../services/lastfm.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'auth-root',
  templateUrl: './auth.component.html',
  providers: [LastFmService]
})

export class AuthComponent implements OnInit {
	action: string;
	@Input() username: string;
	sessionKey: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private lastFmService: LastFmService
	) {}

	ngOnInit() {
	    this.route.params.subscribe(params => {
	      this.action = params['action'];
	      if (this.action == 'logout') {
	      	this.logOut();
	      } else if (this.action == 'login') {
	      	this.logIn();
	      } else if (this.action == 'authenticate') {
	      	this.authenticate();
	      }});
	}

	logIn() {
		this.lastFmService.requestAuth();
	}

	authenticate() {
		let token = this.route.snapshot.queryParams['token'];
		if (token) {
			this.lastFmService.fetchSession(token)
			.subscribe((data: any) => {
				this.sessionKey = data.session.key;
				this.username = data.session.name;
				localStorage.setItem('lastfm_album_scrobbler_sk', this.sessionKey);
				localStorage.setItem('lastfm_album_scrobbler_user', this.username);
				this.router.navigate(['/main']);
			})
		}
	}

	logOut() {
		this.username = null;
		this.sessionKey = null;
		localStorage.removeItem('lastfm_album_scrobbler_sk');
		localStorage.removeItem('lastfm_album_scrobbler_user');
		this.router.navigate(['/']);
	}
}
