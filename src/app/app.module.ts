import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { routing, appRoutingProviders } from './app.routes';

import { AppComponent } from './app.component';
import { AuthComponent } from './views/auth.component';
import { MainComponent } from './views/main.component';
import { UserComponent } from './views/user.component';
import { AlbumComponent } from './views/album.component';
import { SearchComponent } from './views/search.component';
import { ScrobbleComponent } from './views/scrobble.component';

import { MD5Service } from './services/md5.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
