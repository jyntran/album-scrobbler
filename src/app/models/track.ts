export class Track {
  name: string;
  number: number;
  artist: string;

  constructor(trackInfo:any) {
    this.name = trackInfo.name;
    this.number = trackInfo.number;
    this.artist = trackInfo.artist;
  }
}