import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export function createApiPropertyDecorator(defaultOptions: ApiPropertyOptions = {}) {
  return (options: ApiPropertyOptions = {}): any => {
    return ApiProperty({
      ...defaultOptions,
      ...options,
    });
  };
}

export function createApiProperty(defaultOptions: ApiPropertyOptions = {}): any {
  return createApiPropertyDecorator({
    ...defaultOptions,
  });
}

export function createOptionalApiProperty(defaultOptions: ApiPropertyOptions = {}): any {
  return createApiPropertyDecorator({
    ...defaultOptions,
    required: false,
  });
}

function createBaseApiProperty(baseOptions: ApiPropertyOptions) {
  return (namespaceOptions: ApiPropertyOptions = {}): any =>
    createApiProperty({
      description: 'Default description.', // reminder to be seen in the UI
      ...baseOptions,
      ...namespaceOptions,
    });
}

export const createDateApiProperty = createBaseApiProperty({
  format: 'date-time',
  type: String,
  example: new Date().toJSON(),
});

export const CreatedAtApiProperty = createDateApiProperty({
  description: 'The date of when the resource was created.',
});

export const UpdatedAtApiProperty = createDateApiProperty({
  description: 'The date of the most recent resource update.',
});

export const createEmailApiProperty = createBaseApiProperty({
  type: String,
  example: 'example@gmail.com',
});

export const createIdApiProperty = createBaseApiProperty({
  description: 'The id of the resource.',
  type: String,
  format: 'uuid',
  example: 'a0a102b9-68f7-4bf6-99b8-970390c357e2',
});
