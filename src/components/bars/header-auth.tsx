'use client'

import Link from 'next/link'

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { useSession } from 'next-auth/react'
import * as actions from '@/actions'

export default function HeaderAuth() {
	const session = useSession()

	const getInitials = (name: string) => {
		const [firstName, lastName] = name.split(' ')
		return firstName.charAt(0) + lastName.charAt(0)
	}

	const name = getInitials(session?.data?.user?.name || 'N A')

	if (session.status === 'loading') {
		return <div>Not authenticated </div>
	} else
		return (
			<>
				<Popover>
					<PopoverTrigger asChild>
						<div className="flex items-center gap-4">
							<p className="text-3xl font-bold text-light-1 max-xs:hidden">
								{session?.data?.user?.name}
							</p>
							<Avatar className="h-50">
								<AvatarImage
									src={session?.data?.user?.image || ' '}
									alt="@shadcn"
								/>

								<AvatarFallback className="text-white border-white">
									{name}
								</AvatarFallback>
							</Avatar>
						</div>
					</PopoverTrigger>

					<PopoverContent className="w-80 bg-slate-900">
						<div className="p-4">
							<form action={actions.signOut}>
								<Button className="text-white" type="submit">
									<Link href="/signin">
										{session?.data?.user?.name ? 'Sign Out' : 'Sign In'}
									</Link>
								</Button>
							</form>
						</div>
					</PopoverContent>
				</Popover>
			</>
		)
}
