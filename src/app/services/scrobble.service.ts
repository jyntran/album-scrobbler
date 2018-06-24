import { Injectable } from '@angular/core';
import { LastFmService } from './lastfm.service';

@Injectable()
export class ScrobbleService {

  constructor(
  	private lastFmService: LastFmService
	) {}
  
  onScrobble() {
  }
}