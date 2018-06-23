import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MD5Service } from './md5.service';

import { Config } from '../../assets/config';

@Injectable()
export class LastFmService {
	readonly authURL = "http://www.last.fm/api/auth/";
	readonly apiURL = "http://ws.audioscrobbler.com/2.0/";
	apiKey: string;
	apiSecret: string;

  constructor(
  	private http: HttpClient,
  	private md5Service: MD5Service
  ) {
  	this.apiKey = Config['apiKey'];
  	this.apiSecret = Config['apiSecret'];
  }

  requestAuth() {
  	window.location.replace(this.authURL + "?api_key=" + this.apiKey + "&cb=http://localhost:4200/callback");
  }

  fetchSession(token: string) {
  	let method = 'auth.getSession';
  	let params = {'api_key': this.apiKey, 'method': method, 'token': token};
  	let url = this.apiURL
	  	+ "?method=" + method
	  	+ "&token=" + token
  		+ "&api_key=" + this.apiKey
	  	+ "&api_sig=" + this.getSignature(method, params)
	  	+ "&format=json";
  	return this.http.get(url);
  }

  getSignature(method: string, params: Object) {
    let signature = "";
    let keys = Reflect.ownKeys(params);
    keys.forEach((key) => {
      signature += key.toString() + params[key];
    })
    signature += this.apiSecret;
    return this.md5(signature);
  }

  md5(str: string) {
  	return this.md5Service.createHash(str);
  }
}