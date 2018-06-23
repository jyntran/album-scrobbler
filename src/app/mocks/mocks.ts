import { Album, Disc, Track } from '../models';

export class Mocks {
	public static album =
		new Album({
			name: 'test',
			discs: [
			new Disc({
				number: 1,
				tracks: [
					new Track({
						name: 'one',
						number: 1,
						artist: 'artist1'
					}),
					new Track({
						name: 'two',
						number: 2,
						artist: 'artist2'
					})
				]})
		]});
}