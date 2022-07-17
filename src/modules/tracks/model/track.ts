import { IsNumber, IsString } from 'class-validator';

export class Track {
  @IsString()
  id: string; // uuid v4
  @IsString()
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  @IsNumber()
  duration: number;
}
