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

	formTrack(track: Track) {
		let name = {};
		name[this.currentLangTrack] = this.getTrackName(track);
		let artist = {};
		artist[this.currentLangArtist] = this.getArtistName(track);
		let album = {};
		album[this.currentLangTitle] = this.getAlbumName(this.album);
		return new Track({
			name: name,
			artist: artist,
			album: album,
			number: track.number
		});
	}

	scrobbleSingle(track: Track) {
		this.scrobbleService.scrobble([this.formTrack(track)]);
	}

	scrobbleDisc(disc: Disc) {
		var tracks = [];
		disc.tracks.forEach((track) => {
			tracks.push(this.formTrack(track));
		});
		this.scrobbleService.scrobble(tracks);
	}

	scrobbleAlbum(album: Album) {
		var tracks = [];
		album.discs.forEach((disc) => {
			disc.tracks.forEach((track) => {
				tracks.push(this.formTrack(track));
			})
		});
		this.scrobbleService.scrobble(tracks);
	}
}
