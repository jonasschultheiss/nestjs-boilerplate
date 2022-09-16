import { ApiProperty } from '@nestjs/swagger';
import { Edge } from './edge.dto';
import { PageInfo } from './page-info.dto';

export class Page<Record> {
  @ApiProperty({ type: () => Edge })
  readonly edges: Edge<Record>[];
  @ApiProperty({ type: () => PageInfo })
  readonly pageInfo: PageInfo;
  @ApiProperty({ type: () => 'totalCount' })
  readonly totalCount: number;

  constructor(partial: Partial<Page<Record>>) {
    Object.assign(this, partial);
  }
}
