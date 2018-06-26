import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { routing, appRoutingProviders } from './app.routes';

import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth.component';
import { MainComponent } from './components/main.component';
import { NavComponent } from './components/nav.component';
import { UserComponent } from './components/user.component';
import { AlbumComponent } from './components/album.component';
import { SearchComponent } from './components/search.component';
import { ScrobbleComponent } from './components/scrobble.component';

import { AuthService } from './services/auth.service';
import { LastFmService } from './services/lastfm.service';
import { MD5Service } from './services/md5.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    NavComponent,
    UserComponent,
    AlbumComponent,
    ScrobbleComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    routing,
  ],
  providers: [
  	appRoutingProviders,
  	MD5Service,
    LastFmService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
