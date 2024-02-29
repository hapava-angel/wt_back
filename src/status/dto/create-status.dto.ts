import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class CreateStatusDto {
  @IsNumber()
  @Type(() => Number)
  requestID: number;

  @ApiProperty({ enum: ['ожидание', 'завершено', 'отмена'] })
  name: string;
}
