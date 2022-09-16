import { ApiProperty } from '@nestjs/swagger';

export class PageInfo {
  @ApiProperty()
  readonly hasNextPage: boolean;

  @ApiProperty()
  readonly hasPreviousPage: boolean;

  @ApiProperty({ required: false, nullable: true })
  readonly startCursor?: string;

  @ApiProperty({ required: false, nullable: true })
  readonly endCursor?: string;
}
