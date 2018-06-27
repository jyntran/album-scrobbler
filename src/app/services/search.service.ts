import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Regex } from '../constants/regex';

@Injectable()
export class SearchService {

  constructor(private http: HttpClient) {}

  findITunesAlbum(url: string) {
  	let match = url.match(Regex.itunes);
  	let id = match[6];
  	let country = match[3];
  	let itunesURL = 'https://itunes.apple.com/lookup?id=' + id + '&entity=song&country=' + country;
    if (country == 'jp') {
      itunesURL += '&lang=ja_jp'
    }
  	let headers = {
  		"Content-Type": "text/plain"
  	}
  	return this.http.get(itunesURL, {headers: headers});
  }

  findVGMDbAlbum(url: string) {
    let match = url.match(Regex.vgmdb);
    let id = match[5];
    let vgmdbURL = 'http://vgmdb.info/album/' + id;
    return this.http.get(vgmdbURL);
  }
}

