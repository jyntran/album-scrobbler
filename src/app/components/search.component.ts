import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../services/search.service';
import { Album, Disc, Track } from '../models';
import { Regex } from '../constants/regex';

@Component({
  selector: 'search-root',
  templateUrl: './search.component.html',
  providers: [SearchService]
})

export class SearchComponent implements OnInit{
	sites = [
		'iTunes', 'VGMDb'
	];
	currentSite = 'iTunes';
	url: string = "";
	album: Album;

	@Input() langTitle: Array<string> = []
	@Input() langTrack: Array<string> = [];
	@Input() langArtist: Array<string> = [];
	currentLangTitle: string;
	currentLangTrack: string;
	currentLangArtist: string;

	isLoading: boolean = false;
	error: string;

	constructor(
		private searchService: SearchService
	) {}

	ngOnInit() {
		this.currentSite = 'iTunes';
	}

	onSiteSwitch(newSite: string) {
		this.currentSite = newSite;
	}

	onChange(newVal: string) {
		this.url = newVal;
	}

	onLangTitleChange(newVal: string) {
		this.currentLangTitle = newVal;
	}

	onLangTrackChange(newVal: string) {
		this.currentLangTrack = newVal;
	}

	onLangArtistChange(newVal: string) {
		this.currentLangArtist = newVal;
	}

	onSearch() {
		this.findAlbum(this.url);
	}

	clearError() {
		this.error = '';
	}

	isITunes(host: string) {
		return this.currentSite == 'iTunes'
			&& host == 'itunes.apple.com';
	}

	isVGMDb(host: string) {
		return this.currentSite == 'VGMDb'
			&& host == 'vgmdb.net';
	}

	private findAlbum(url: string){
		this.clearError();
		this.isLoading = true;
		let host = url.match(Regex.hostname)[1];
		if (this.isITunes(host)) {
	  		this.searchService.findITunesAlbum(url)
	  			.subscribe((data: any) => {
		  			this.album = this.createITunesAlbum(data.results);
		  			this.currentLangTitle = this.album.langTitle[0];
		  			this.currentLangTrack = this.album.langTrack[0];
		  			this.currentLangArtist = this.album.langArtist[0];
		  		}, error => {
		  			this.error = error;
		  		}, () => {
		  			this.isLoading = false;
		  		})
		} else if (this.isVGMDb(host)) {
	  		this.searchService.findVGMDbAlbum(url)
	  			.subscribe((data: any) => {
		  			this.album = this.createVGMDBAlbum(data);
		  			this.currentLangTitle = this.album.langTitle[0];
		  			this.currentLangTrack = this.album.langTrack[0];
		  			this.currentLangArtist = this.album.langArtist[0];
		  		}, error => {
		  			this.error = error;
		  		}, () => {
		  			this.isLoading = false;
		  		})
		} else {
			this.error = "Error: URL is invalid";
			this.isLoading = false;
		}
	}

  private createITunesAlbum(albumData: any) {
  	let album = albumData.filter((obj) => {
			return obj.wrapperType == 'collection';
		})[0];
	let discs = this.createiTunesDiscs(albumData, album.country);
	let name = {};
	name[album.country] = album.collectionName;
	let langTitle = [album.country];
  	return new Album({
  		name: name,
  		artist: album.artistName,
  		discs: discs,
  		artwork: album.artworkUrl100,
  		langTitle: langTitle,
  		langTrack: langTitle
  	});
  }

  private createVGMDBAlbum(albumData: any) {
	let artistName = this.getArtistName(albumData);
	let langArtist = Object.keys(artistName);
  	let discData = this.createVGMDbDiscs(albumData, artistName);
	let discs = discData.discs;
	let langTitle = Object.keys(albumData.names);
	let langTrack = this.getTrackLanguages(albumData);
	let name = {};
	langTitle.forEach((lang) => {
		name[lang] = albumData.names[lang];
	});
  	return new Album({
  		name: name,
  		discs: discs,
  		artwork: albumData.picture_thumb,
  		langTitle: langTitle,
  		langTrack: langTrack,
  		langArtist: langArtist
  	});
  }

  private getTrackLanguages(albumData: any) {
  	let obj = albumData.discs[0].tracks[0].names;
  	return Object.keys(obj);
  }

  private createiTunesDiscs(albumData: any, lang: string) {
		let discs = [];
		let discCount = albumData.length > 1 ? albumData[1].discCount : 1;
		for (var i = 1; i <= discCount; i++) {
			let trackData = albumData.filter((obj) => {
				return obj.discNumber == i;
			});
			var tracks = [];
			trackData.forEach((t) => {
				let trackName = {};
				trackName[lang] = t.trackName;
				let artistName = {};
				artistName[lang] = t.artistName;
				let track = new Track({
					name: trackName,
					number: t.trackNumber,
					artist: artistName,
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

  private createVGMDbDiscs(albumData: any, artist: Object) {
  	let langArtist = [];
	let discs = [];
	let discCount = albumData.discs.length;
	albumData.discs.forEach((d, i) => {
		var tracks = [];
		d.tracks.forEach((t, i) => {
			let track = new Track({
				name: t.names,
				number: i+1,
				artist: artist,
			});
			tracks.push(track);
		})
		let disc = new Disc({
			number: i+1,
			tracks: tracks
		});
		discs.push(disc);
	})
	return {
		discs: discs,
		langArtist: langArtist
	};
  }

  private getArtistName(data: any) {
  	if ('performers' in data
  		&& data.performers.length > 0) {
  		return data.performers[0].names;
  	}
  	if ('composers' in data
  		&& data.composers.length > 0) {
  		return data.composers[0].names;
  	}
  	if ('arrangers' in data
  		&& data.arrangers.length > 0) {
  		return data.arrangers[0].names;
  	}
  	if ('lyricists' in data
  		&& data.lyricists.length > 0) {
  		return data.lyricists[0].names;
  	}
  	if ('publisher' in data) {
  		return data.publisher.names;
  	}
  	if ('organizations' in data
  		&& data.organizations.length > 0) {
  		return data.organizations[0].names;
  	}
  	if ('distributor' in data) {
  		return data.distributor.names;
  	}
  	return data.names; // if all else fails
  }
}
