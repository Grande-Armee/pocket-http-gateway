import { ResourceDto, TagDto, UserResourceStatus } from '@grande-armee/pocket-common';

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

export const UserResourceStatusApiProperty = createApiProperty({
  description: `User resource's status.`,
  type: UserResourceStatus,
  example: 'toRead',
});

export const UserResourceIsFavoriteApiProperty = createApiProperty({
  description: `User resource's is favorite.`,
  type: Boolean,
  example: true,
});

export const UserResourceRatingApiProperty = createOptionalApiProperty({
  description: `User resource's rating.`,
  type: Number,
  example: 3,
});

export const UserResourceResourceApiProperty = createOptionalApiProperty({
  description: `User resource's resource.`,
  type: ResourceDto,
  example: null,
});

export const UserResourceTagsApiProperty = createOptionalApiProperty({
  description: `User resource's tags.`,
  type: [TagDto],
  example: null,
});
