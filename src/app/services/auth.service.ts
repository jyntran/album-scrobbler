import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() {}

  public isAuthenticated() {
    return localStorage.getItem('lastfm_album_scrobbler_sk') != null;
  }

  public getSessionKey() {
    return localStorage.getItem('lastfm_album_scrobbler_sk');
  }

  public getUsername() {
    return localStorage.getItem('lastfm_album_scrobbler_user');
  }
}