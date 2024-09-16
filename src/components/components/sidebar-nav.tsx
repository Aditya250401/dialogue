'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import type { Topic } from '@prisma/client' // Adjust the import path according to your project structure

export interface TopicsSidebarNavProps {
	topics: Topic[]
}

export function TopicsSidebarNav({ topics }: TopicsSidebarNavProps) {
	const pathname = usePathname()

	return topics.length ? (
		<div className="w-full">
			<h3 className="text-xl text-white italic mb-7">Trending Topics</h3>

			{topics.map((topic, index) => (
				<div key={index} className={cn('pb-2')}>
					<Link
						href={`/topics/${topic.slug}`}
						className={cn(
							'group flex w-full items-center rounded-md border border-transparent px-2 py-1 text-sm text-blue-600 hover:underline',
							pathname === `/topics/${topic.slug}`
								? 'font-medium'
								: 'font-light'
						)}
					>
						{topic.slug}
					</Link>
				</div>
			))}
		</div>
	) : null
}
