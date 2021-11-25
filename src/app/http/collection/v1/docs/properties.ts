import { createIdApiProperty, createOptionalApiProperty } from '@shared/docs/properties';

export const UserIdApiProperty = createIdApiProperty({
  description: `User's id.`,
});

export const ResourceIdApiProperty = createIdApiProperty({
  description: `Resource's id.`,
});

export const CollectionIdApiProperty = createIdApiProperty({
  description: `Collection's id.`,
});

export const CollectionTitleApiProperty = createOptionalApiProperty({
  description: `Collection's title.`,
  type: String,
  example: 'Example title',
});

export const CollectionThumbnailUrlApiProperty = createOptionalApiProperty({
  description: `Collection's thumbnail url.`,
  type: String,
  example: 'https://picsum.photos/200/300',
});

export const CollectionContentApiProperty = createOptionalApiProperty({
  description: `Collection's content.`,
  type: String,
  example: 'Example content',
});
