import { createIdApiProperty, createApiProperty, createOptionalApiProperty } from '@shared/docs/properties';

export const UserIdApiProperty = createIdApiProperty({
  description: `User's id.`,
});

export const ResourceIdApiProperty = createIdApiProperty({
  description: `Resource's id.`,
});

export const UserResourceIdApiProperty = createIdApiProperty({
  description: `User resource's id.`,
});

export const UserResourceUrlApiProperty = createApiProperty({
  description: `User resource's url.`,
  type: String,
  example: 'http://example.net/',
});

export const UserResourceTitleApiProperty = createOptionalApiProperty({
  description: `User resource's title.`,
  type: String,
  example: 'Example title',
});

export const UserResourceThumbnailUrlApiProperty = createOptionalApiProperty({
  description: `User resource's thumbnail url.`,
  type: String,
  example: 'https://picsum.photos/200/300',
});

export const UserResourceContentApiProperty = createOptionalApiProperty({
  description: `User resource's content.`,
  type: String,
  example: 'Example content',
});
