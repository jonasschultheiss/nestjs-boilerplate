/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// disabling these rules, as the type is implicitly provided by applyDecorators
// the type is comlex and tbh i don't understand it fully
import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { Page } from './../dto/page.dto';

export const ApiPageResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PageResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(Page) },
          {
            properties: {
              edges: {
                type: 'array',
                title: `EdgeOf${model.name}`,
                items: {
                  type: 'object',
                  required: ['cursor', 'node'],
                  properties: {
                    cursor: { type: 'string' },
                    node: { type: 'object', $ref: getSchemaPath(model) }
                  }
                }
              }
            }
          }
        ]
      }
    }),
    ApiExtraModels(Page)
  );
};
