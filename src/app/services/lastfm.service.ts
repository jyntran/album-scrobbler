import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MD5Service } from './md5.service';
import { AuthService } from './auth.service';
import { Album, Disc, Track } from '../models';

import { Config } from '../../assets/config';

@Injectable()
export class LastFmService {
  apiKey: string;
  apiSecret: string;
  authURL: string;
  apiURL: string;
  callbackURL: string;

  constructor(
  	private http: HttpClient,
    private md5Service: MD5Service,
  	private authService: AuthService
  ) {
  	this.apiKey = Config['apiKey'];
    this.apiSecret = Config['apiSecret'];
    this.authURL = Config['authURL'];
    this.apiURL = Config['apiURL'];
    this.callbackURL = Config['callbackURL'];
  }

  requestAuth() {
  	window.location.replace(this.authURL + "?api_key=" + this.apiKey + "&cb=" + this.callbackURL);
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

  scrobble(tracks: Array<Track>) {
    let method = 'track.scrobble';
    let url = this.apiURL;
    let params = {
      'api_key': this.apiKey,
      'method': method,
      'sk': this.authService.getSessionKey(),
    };
    tracks.forEach((track, i) => {
      let timestamp = Math.floor(Date.now()/1000) + i;
      params['artist['+i+']'] = track.artist[Object.keys(track.artist)[0]];
      params['timestamp['+i+']'] = timestamp;
      params['track['+i+']'] = track.name[Object.keys(track.name)[0]];
      params['album['+i+']'] = track.album[Object.keys(track.album)[0]];
    });
    let signature = this.getSignature(method, params);
    params['api_sig'] = signature;
    params['format'] = 'json';
    let httpParams = new HttpParams({fromObject: params});
    return this.http.post(url, httpParams);
  }

  private encode(value: any) {
    return unescape(encodeURIComponent(value));
  }

  private md5(str: string) {
    return this.md5Service.createHash(str);
  }

  private getSignature(method: string, params: Object) {
    let signature = "";
    let keys = [];
    for (var key in params) {
      keys.push(key);
    }
    for (var i in keys.sort()) {
      key = keys[i];
      signature += this.encode(key) + this.encode(params[key]);
    }
    signature += this.apiSecret;
    return this.md5(signature);
  }
}