import { Disc } from './';

export class Album {
  name: Object;
  artist: string;
  discs: Array<Disc>;
  artwork: string;
  langTitle: Array<string>;
  langTrack: Array<string>;
  langArtist: Array<string>;

  constructor(albumInfo: any) {
    this.name = albumInfo.name;
    this.artist = albumInfo.artist;
    this.discs = albumInfo.discs;
    this.artwork = albumInfo.artwork;
    this.langTitle = albumInfo.langTitle;
    this.langTrack = albumInfo.langTrack;
    this.langArtist = albumInfo.langArtist;
  }
}