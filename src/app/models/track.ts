export class Track {
  name: Object;
  artist: Object;
  number: number;

  constructor(trackInfo:any) {
    this.name = trackInfo.name;
    this.artist = trackInfo.artist;
    this.number = trackInfo.number;
  }
}