import { Component } from '@angular/core';

@Component({
  selector: 'scrobble-root',
  templateUrl: './scrobble.component.html',
})

export class ScrobbleComponent {
	language: string = 'Language';
	languages = [
		{
			name: 'English',
			code: 'en_us'
		},
		{
			name: 'Japanese',
			code: 'ja_jp'
		},
	]

	constructor() {}

	onScrobble() {alert('scrobble')}

	onScrobbleSingle() {}

	onScrobbleDisc() {}

}
