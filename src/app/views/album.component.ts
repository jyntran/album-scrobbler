import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../models';

@Component({
  selector: 'album-root',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {
	@Input() album: Album;

	constructor() {}

	ngOnInit() {}
}
