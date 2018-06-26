import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      'artist': track.artist,
      'method': method,
      'sk': this.authService.getSessionKey(),
      'timestamp': timestamp,
      'track': track.name,
    };
    params['api_sig'] = this.getSignature(method, params);
    params['format'] = 'json';
    let _params = [];
    for (var param in params) {
      _params.push(encodeURIComponent(param) + "="
        + encodeURIComponent(params[param]));
    }
    let _data = _params.join('&');
    let url = this.apiURL;
    let options = {
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      }
    }
    return this.http.post(url, _data, options);
  }

  getSignature(method: string, params: Object) {
    let signature = "";
    let keys = [];
    for (var key in params) {
      keys.push(key);
    }
    for (var i in keys.sort()) {
      key = keys[i];
      signature += key + params[key];
    }
    signature += this.apiSecret;
    return this.md5(signature);
  }

  md5(str: string) {
  	return this.md5Service.createHash(str);
  }
}