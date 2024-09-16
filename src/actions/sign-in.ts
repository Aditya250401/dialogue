'use server'

import * as auth from '@/auth'

export async function signIn(provider: string) {
	if (typeof provider !== 'string') {
		throw new Error('Provider must be a string')
	}
	return auth.signIn(provider)
}

export async function SignInWithEmail(email: string) {
	if (typeof email !== 'string') {
		throw new Error('Email and password must be strings')
	}
	return auth.signIn('email', { email })
}
