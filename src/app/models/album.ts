import { Disc } from './';

export class Album {
  name: string;
  discs: Array<Disc>;
  artwork: string;

  constructor(albumInfo: any) {
    this.name = albumInfo.name;
    this.discs = albumInfo.discs;
    this.artwork = albumInfo.artwork;
  }
}