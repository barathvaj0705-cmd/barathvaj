import 'server-only';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME } from '@/lib/constants';
import type { User } from './types';

export async function getAuthenticatedUser(): Promise<User | null> {
  const cookieStore = cookies();
  const session = cookieStore.get(AUTH_COOKIE_NAME);

  if (!session) {
    return null;
  }

  try {
    const user = JSON.parse(session.value);
    return user;
  } catch (error) {
    console.error('Failed to parse user session cookie:', error);
    return null;
  }
}
