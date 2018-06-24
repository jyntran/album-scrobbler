import { Disc } from './';

export class Album {
  name: string;
  artist: string;
  discs: Array<Disc>;
  artwork: string;

  constructor(albumInfo: any) {
    this.name = albumInfo.name;
    this.artist = albumInfo.artist;
    this.discs = albumInfo.discs;
    this.artwork = albumInfo.artwork;
  }
}