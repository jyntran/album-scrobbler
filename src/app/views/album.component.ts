import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../models';
import { Mocks } from '../mocks/mocks';

@Component({
  selector: 'album-root',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {
	@Input() album: Album;

	constructor() {}

	ngOnInit() {
		this.album = Mocks.album;
		console.log(this.album)
	}
}
