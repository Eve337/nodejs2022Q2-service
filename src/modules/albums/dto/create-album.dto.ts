import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsNotEmpty({ message: 'The required name field is missing' })
  name: string;
  @IsNumber()
  @IsNotEmpty({ message: 'The required year field is missing' })
  year: number;
  artistId: string | null;
}
