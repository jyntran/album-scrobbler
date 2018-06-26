import { Album, Disc, Track } from '../models';

export class Mocks {
	public static album =
		new Album({
			name: 'Helios / Erebus',
			artist: 'God is an Astronaut',
			langTitle: ['en', 'ja'],
			langTrack: ['English', 'Japanese'],
			artwork: 'https://lastfm-img2.akamaized.net/i/u/174s/0c774d9eec680371c597e50b74efe7ee.jpg',
			discs: [
			new Disc({
				number: 1,
				tracks: [
					new Track({
						name: 'Sea of Trees',
						number: 8,
						artist: 'God is an Astronaut'
					}),
				]}),

		]});

	public static album2 =
		new Album({
			name: 'Resurrection',
			artist: 'Galneryus',
			langTitle: ['en', 'ja'],
			langTrack: ['English', 'Japanese'],
			artwork: 'https://lastfm-img2.akamaized.net/i/u/174s/3b4b9e1d7b164290c2918ed1145303fd.jpg',
			discs: [
			new Disc({
				number: 1,
				tracks: [
					new Track({
						name: 'Destiny',
						number: 10,
						artist: 'Galneryus'
					}),
				]}),

		]});


}