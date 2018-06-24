import { Component } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Album, Disc, Track } from '../models';
import { Regex } from '../constants/regex';

@Component({
  selector: 'search-root',
  templateUrl: './search.component.html',
  providers: [SearchService]
})

export class SearchComponent {
	url: string = "";
	album: Album;

	constructor(
		private searchService: SearchService
	) {}

	onChange(newVal: string) {
		this.url = newVal;
	}

	onSearch() {
		this.findAlbum(this.url);
	}

	isITunes(host: string) {
		return host == 'itunes.apple.com';
	}

	private findAlbum(url: string){
  	let host = url.match(Regex.hostname)[1];
  	if (this.isITunes(host)) {
  		this.searchService.findITunesAlbum(this.url)
  			.subscribe((data: any) => {
	  			this.album = this.createITunesAlbum(data.results);
  		})
  	}
	}

  private createITunesAlbum(albumData: any) {
  	let album = albumData.filter((obj) => {
			return obj.wrapperType == 'collection';
		})[0];
		let discs = this.createDiscs(albumData);
  	return new Album({
  		name: album.collectionName,
  		discs: discs,
  		artwork: album.artworkUrl100
  	});
  }

  private createDiscs(albumData: any) {
		let discs = [];
		let discCount = albumData.length > 1 ? albumData[1].discCount : 1;
		for (var i = 1; i <= discCount; i++) {
			let trackData = albumData.filter((obj) => {
				return obj.discNumber == i;
			});
			var tracks = [];
			trackData.forEach((t) => {
				let track = new Track({
					name: t.trackName,
					number: t.trackNumber,
					artist: t.artistName,
				});
				tracks.push(track);
			});
			let disc = new Disc({
				number: i,
				tracks: tracks
			});
			discs.push(disc);
		}
		return discs;
  }
}
