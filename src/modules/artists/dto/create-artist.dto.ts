import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty({ message: 'The required name field is missing' })
  name: string;
  @IsNotEmpty({ message: 'The required grammy field is missing' })
  grammy: boolean;
}
