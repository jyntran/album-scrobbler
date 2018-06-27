import { Component, OnInit, Input } from '@angular/core';
import { Album, Disc, Track } from '../models';
import { ScrobbleService } from '../services/scrobble.service';

@Component({
  selector: 'album-root',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
  providers: [ScrobbleService]
})

export class AlbumComponent implements OnInit {
	@Input() album: Album;

	@Input() currentLangTitle: string;
	@Input() currentLangTrack: string;

	constructor(
		private scrobbleService: ScrobbleService
	) {}

	ngOnInit() {
	}

	getAlbumName(name: object) {
		return name[this.currentLangTitle];
	}

	getTrackName(name: object) {
		return name[this.currentLangTrack];
	}

	scrobbleSingle(track: Track) {
		this.scrobbleService.onScrobble(track);
	}
}
