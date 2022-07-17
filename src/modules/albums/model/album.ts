import { IsNumber, IsString } from 'class-validator';

export class Album {
  @IsString()
  id: string; // uuid v4
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  artistId: string | null; // refers to Artistt update
}
