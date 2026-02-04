'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { AUTH_COOKIE_NAME } from '@/lib/constants';

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signIn(prevState: any, formData: FormData) {
  try {
    const parsed = signInSchema.parse(Object.fromEntries(formData.entries()));

    // MOCK: In a real app, you would validate credentials against a database
    if (parsed.email === 'student@example.com' && parsed.password === 'password') {
      const user = { id: '1', name: 'John Doe', email: parsed.email };
      cookies().set(AUTH_COOKIE_NAME, JSON.stringify(user), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });
    } else {
      return { error: 'Invalid email or password' };
    }
  } catch (e) {
    return { error: 'Invalid form data' };
  }

  redirect('/dashboard');
}

export async function signUp(prevState: any, formData: FormData) {
  try {
    const parsed = signUpSchema.parse(Object.fromEntries(formData.entries()));

    // MOCK: In a real app, you would create a new user in the database
    const user = { id: '1', name: parsed.name, email: parsed.email };
    cookies().set(AUTH_COOKIE_NAME, JSON.stringify(user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      return { error: e.errors.map(err => err.message).join(', ') };
    }
    return { error: 'An unexpected error occurred.' };
  }
  redirect('/dashboard');
}

export async function signOut() {
  cookies().delete(AUTH_COOKIE_NAME);
  redirect('/login');
}
