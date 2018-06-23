import { Component, OnInit } from '@angular/core';
import { Album } from '../models';
import { Mocks } from '../mocks/mocks';

@Component({
  selector: 'album-root',
  templateUrl: './album.component.html',
})

export class AlbumComponent implements OnInit {
	album: Album;

	constructor() {
	}

	ngOnInit() {
	}
}
