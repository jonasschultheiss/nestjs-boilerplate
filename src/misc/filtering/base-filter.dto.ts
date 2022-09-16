import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class BaseFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  @Transform(({ obj, value }) => {
    if (obj.last) {
      return undefined;
    }

    return value;
  })
  @Type(() => Number)
  @ApiProperty({ required: false })
  readonly first?: number = 25;

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  @ApiProperty({ required: false })
  readonly last?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false })
  readonly before?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: false })
  readonly after?: string;
}
