export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export const UserRole = {
  PLAYER: 'PLAYER',
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];


export const STORAGE_KEYS = {
  TOKEN: 'playhub_token',
  USER: 'playhub_user',
};
