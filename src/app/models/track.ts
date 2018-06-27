export class Track {
  name: Object;
  number: number;
  artist: string;

  constructor(trackInfo:any) {
    this.name = trackInfo.name;
    this.number = trackInfo.number;
    this.artist = trackInfo.artist;
  }
}