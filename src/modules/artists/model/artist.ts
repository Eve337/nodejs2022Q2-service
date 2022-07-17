import { IsString } from 'class-validator';

export class Artist {
  @IsString()
  id: string; // uuid v4
  @IsString()
  name: string;
  grammy: boolean;
}
