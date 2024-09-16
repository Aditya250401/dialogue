'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { Button } from '@/registry/new-york/ui/button'
import { Input } from '@/registry/new-york/ui/input'
import { Label } from '@/registry/new-york/ui/label'

import { useSession } from 'next-auth/react'
import * as actions from '@/actions'
import { redirect } from 'next/navigation'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
	const session = useSession()

	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	const [email, setEmail] = React.useState<string>('')

	// React.useEffect(() => {
	// 	if (session.status === 'loading') {
	// 		setIsLoading(true)
	// 	} else if (session.status === 'authenticated') {
	// 		setIsLoading(false)
	// 		redirect('/')
	// 	} else {
	// 		setIsLoading(false)
	// 	}
	// }, [session.status])
	
	const handleSignInWithEmail = async () => {
		if (!email) return // Don't proceed if email is empty
		setIsLoading(true)
		try {
			await actions.SignInWithEmail(email) // Assuming signInWithEmail exists in actions
			// Handle success or redirection if necessary
		} catch (error) {
			console.error('Error signing in with email:', error)
			// Handle error if needed
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={cn('grid gap-6', className)} {...props}>
			<div className="grid gap-2">
				<div className="grid gap-1">
					<Label className="sr-only" htmlFor="email">
						Email
					</Label>
					<Input
						id="email"
						placeholder="name@example.com"
						type="email"
						autoCapitalize="none"
						autoComplete="email"
						autoCorrect="off"
						disabled={isLoading}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<Button disabled={isLoading} onClick={handleSignInWithEmail}>
					{isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
					Sign In with Email
				</Button>
			</div>

			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>

			<Button
				variant="outline"
				type="submit"
				disabled={isLoading}
				onClick={async () => await actions.signIn('github')}
			>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}{' '}
				GitHub
			</Button>
			<Button
				variant="outline"
				type="submit"
				disabled={isLoading}
				onClick={async () => await actions.signIn('google')}
			>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.google className="mr-2 h-4 w-4" />
				)}{' '}
				Google
			</Button>
		</div>
	)
}
