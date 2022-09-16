import { ApiProperty } from '@nestjs/swagger';

export class Edge<Record> {
  @ApiProperty()
  readonly cursor: string;

  @ApiProperty()
  readonly node: Record;
}
