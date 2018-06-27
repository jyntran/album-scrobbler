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
	@Input() currentLangArtist: string;

	constructor(
		private scrobbleService: ScrobbleService
	) {}

	ngOnInit() {
	}

	getAlbumName(album: Album) {
		return album.name[this.currentLangTitle];
	}

	getTrackName(track: Track) {
		return track.name[this.currentLangTrack];
	}

	getArtistName(track: Track) {
		return track.artist[this.currentLangArtist];
	}

	scrobbleSingle(track: Track) {
		let name = {};
		name[this.currentLangTrack] = this.getTrackName(track);
		let artist = {};
		artist[this.currentLangArtist] = this.getArtistName(track);
		this.scrobbleService.onScrobble(new Track({
			name: name,
			artist: artist,
			number: track.number
		}));
	}
}
