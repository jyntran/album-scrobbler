import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MD5Service } from './md5.service';
import { AuthService } from './auth.service';
import { Album, Disc, Track } from '../models';

import { Config } from '../../assets/config';

@Injectable()
export class LastFmService {
	readonly authURL = "http://www.last.fm/api/auth/";
	readonly apiURL = "http://ws.audioscrobbler.com/2.0/";
	apiKey: string;
	apiSecret: string;

  constructor(
  	private http: HttpClient,
    private md5Service: MD5Service,
  	private authService: AuthService
  ) {
  	this.apiKey = Config['apiKey'];
  	this.apiSecret = Config['apiSecret'];
  }

  requestAuth() {
  	window.location.replace(this.authURL + "?api_key=" + this.apiKey + "&cb=http://albumscrobbler.surge.sh/callback");
  }

  fetchSession(token: string) {
  	let method = 'auth.getSession';
  	let params = {
      'api_key': this.apiKey,
      'method': method,
      'token': token
    };
  	let url = this.apiURL
	  	+ "?method=" + method
	  	+ "&token=" + token
  		+ "&api_key=" + this.apiKey
	  	+ "&api_sig=" + this.getSignature(method, params)
	  	+ "&format=json";
  	return this.http.get(url);
  }

  scrobble(track: Track) {
    let timestamp = Math.floor(Date.now()/1000);
    let method = 'track.scrobble';
    let params = {
      'api_key': this.apiKey,
      'artist': track.artist[Object.keys(track.artist)[0]],
      'method': method,
      'sk': this.authService.getSessionKey(),
      'timestamp': timestamp,
      'track': track.name[Object.keys(track.name)[0]]
    };
    let signature = this.getSignature(method, params);
    let httpParams = new HttpParams()
    .set("api_key", this.apiKey)
    .set("artist", track.artist[Object.keys(track.artist)[0]])
    .set("method", method)
    .set("sk", this.authService.getSessionKey())
    .set("timestamp", timestamp.toString())
    .set("track", track.name[Object.keys(track.name)[0]])
    .set("api_sig", this.getSignature(method, params))
    .set("format", "json");
    let url = this.apiURL;
    return this.http.post(url, httpParams);
  }

  getSignature(method: string, params: Object) {
    let signature = "";
    let keys = [];
    for (var key in params) {
      keys.push(key);
    }
    for (var i in keys.sort()) {
      key = keys[i];
      signature += key + unescape(encodeURIComponent(params[key]));
    }
    signature += this.apiSecret;
    return this.md5(signature);
  }

  md5(str: string) {
  	return this.md5Service.createHash(str);
  }
}