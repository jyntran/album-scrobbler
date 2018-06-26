import { Injectable } from '@angular/core';
import { LastFmService } from './lastfm.service';
import { Album, Disc, Track } from '../models';

@Injectable()
export class ScrobbleService {
  success: string;
  error: string;

  constructor(
  	private lastFmService: LastFmService
	) {}

  clearError() {
    this.success = '';
    this.error = '';
  }
  
  onScrobble(track: Track) {
  	this.lastFmService.scrobble(track)
  	.subscribe(
      result => {
  		  //console.log(result)
        this.success = '"' + track.name + '" by ' + track.artist + ' was successfully scrobbled!';
      },
      error  => {
        this.error = "Error: " + error;
      }
    )
  }
}