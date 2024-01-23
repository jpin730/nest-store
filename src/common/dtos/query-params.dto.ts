import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { IsOptional, IsPositive, Min } from 'class-validator';

export function ApiQueryFilters(): (...decorators: unknown[]) => void {
  return applyDecorators(
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Limit the number of results',
    }),
    ApiQuery({
      name: 'offset',
      required: false,
      type: Number,
      description: 'Number of results to skip',
    }),
  );
}

export class QueryParamsDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;
}

export interface PaginatedDto<T> {
  data: T[];
  limit: number;
  offset: number;
  total: number;
}
