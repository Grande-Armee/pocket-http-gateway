import { createIdApiProperty, createApiProperty, createEmailApiProperty } from '@shared/docs/properties';

export const UserIdApiProperty = createIdApiProperty({
  description: `User's id.`,
});

export const UserPasswordApiProperty = createApiProperty({
  description: `User's password.`,
  type: String,
  example: 'password123',
});

export const UserEmailApiProperty = createEmailApiProperty({
  description: `User's email`,
});
