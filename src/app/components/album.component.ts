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

	constructor(
		private scrobbleService: ScrobbleService
	) {}

	ngOnInit() {
	}

	scrobbleSingle(track: Track) {
		this.scrobbleService.onScrobble(track);
	}
}
