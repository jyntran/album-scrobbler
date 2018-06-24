import { Component, OnInit } from '@angular/core';
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
		let host = url.match(Regex.hostname)[1];
		if (this.isITunes(host)) {
  		this.searchService.findITunesAlbum(url)
  			.subscribe((data: any) => {
	  			this.album = this.createITunesAlbum(data.results);
	  		})
		} else if (this.isVGMDb(host)) {
  		this.searchService.findVGMDbAlbum(url)
  			.subscribe((data: any) => {
  				console.log(data);
	  			this.album = this.createVGMDBAlbum(data); //TODO
	  		})
		} else {
			this.error = "Error: URL is invalid";
		}
	}

  private createITunesAlbum(albumData: any) {
  	let album = albumData.filter((obj) => {
			return obj.wrapperType == 'collection';
		})[0];
		let discs = this.createDiscs(albumData);
  	return new Album({
  		name: album.collectionName,
  		artist: album.artistName,
  		discs: discs,
  		artwork: album.artworkUrl100
  	});
  }

  private createVGMDBAlbum(albumData: any) {
  	let album = albumData.filter((obj) => {
			return obj.wrapperType == 'collection';
		})[0];
		let discs = this.createDiscs(albumData);
  	return new Album({
  		name: 'todo',
  		discs: [],
  		artwork: 'https://placeimg.com/100/100/arch?t=1529860719960'
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
