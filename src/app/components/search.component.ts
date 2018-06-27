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
	currentLangTitle: string;
	currentLangTrack: string;

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
	let discs = this.createVGMDbDiscs(albumData);
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
  		langTrack: langTrack
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
				let name = {};
				name[lang] = t.trackName;
				let track = new Track({
					name: name,
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

  private createVGMDbDiscs(albumData: any) {
	let discs = [];
	let discCount = albumData.discs.length;
	albumData.discs.forEach((d, i) => {
		var tracks = [];
		d.tracks.forEach((t, i) => {
			let track = new Track({
				name: t.names,
				number: i+1,
				artist: 'Various Artists',
			});
			tracks.push(track);
		})
		let disc = new Disc({
			number: i+1,
			tracks: tracks
		});
		discs.push(disc);
	})
	return discs;
  }
}
