import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'The required login field is missing' })
  login: string;
  @IsString()
  @IsNotEmpty({ message: 'The required password field is missing' })
  password: string;
}
