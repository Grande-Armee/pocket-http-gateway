import { createIdApiProperty, createApiProperty, createOptionalApiProperty } from '@shared/docs/properties';

export const UserIdApiProperty = createIdApiProperty({
  description: `User's id.`,
});

export const TagIdApiProperty = createIdApiProperty({
  description: `Tag's id.`,
});

export const TagColorApiProperty = createApiProperty({
  description: `Tag's color.`,
  type: String,
  example: 'black',
});

export const TagTitleApiProperty = createOptionalApiProperty({
  description: `Tag's title.`,
  type: String,
  example: 'Example title',
});
