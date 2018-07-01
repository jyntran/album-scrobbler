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

  scrobble(tracks: Array<Track>) {
    this.batch(tracks);
  }

  private batch(tracks: Array<Track>) {
    let total = tracks.length;
    let a = 0;
    let b = 50;
    while (total > 0) {
      this.lastFmService.scrobble(tracks.slice(a, b))
      .subscribe(
        result => {
          this.success = 'Track(s) successfully scrobbled!';
        },
        error  => {
          this.error = "Error: " + error;
        }
      )
      total -= 50;
      a += 49;
      b += 49;
    }
  }
  
}