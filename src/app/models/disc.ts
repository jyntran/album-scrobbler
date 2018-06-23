import { Track } from './';

export class Disc {
  number: number;
  tracks: Array<Track>;

  constructor(discInfo: any) {
    this.number = discInfo.number;
    this.tracks = discInfo.tracks;
  }
}