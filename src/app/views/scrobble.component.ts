import { Component, Input } from '@angular/core';

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

	@Input() langTitle: Array<string> = ['en', 'ja', 'ja-latn']
	@Input() langTrack: Array<string> = ['English', 'Japanese'];

	currentLangTitle: string;
	currentLangTrack: string;

	constructor() {}

	onScrobble() {alert('scrobble')}

	onScrobbleSingle() {}

	onScrobbleDisc() {}

}
