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
  
  onScrobble(tracks: Array<Track>) {
  	this.lastFmService.scrobble(tracks)
  	.subscribe(
      result => {
        this.success = 'Track(s) successfully scrobbled!';
      },
      error  => {
        this.error = "Error: " + error;
      }
    )
  }
}