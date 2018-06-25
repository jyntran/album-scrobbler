import { Injectable } from '@angular/core';
import { LastFmService } from './lastfm.service';
import { Album, Disc, Track } from '../models';

@Injectable()
export class ScrobbleService {

  constructor(
  	private lastFmService: LastFmService
	) {}
  
  onScrobble(track: Track) {
  	console.log(track);
  	this.lastFmService.scrobble(track)
  	.subscribe((data: any) => {
  		console.log(data)
  	})
  }
}