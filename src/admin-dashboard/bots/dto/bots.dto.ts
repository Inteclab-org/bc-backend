import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateBotDTO {
  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  tg_token: string;
}
