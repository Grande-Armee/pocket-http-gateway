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

export const UserIsActiveApiProperty = createApiProperty({
  description: 'User account activation status.',
  type: Boolean,
  example: true,
});

export const UserRoleApiProperty = createApiProperty({
  description: `User's role.`,
  type: String,
  example: 'USER',
});

export const UserLanguageApiProperty = createApiProperty({
  description: `User's language.`,
  type: String,
  example: 'en',
});

export const UserTokenApiProperty = createApiProperty({
  description: `User's token.`,
  type: String,
  example:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
});
