import type { Post, User, Topic } from '@prisma/client'
import Link from 'next/link'
import Image from 'next/image'
import paths from '@/paths'
import { PostWithData } from '@/db/queries/posts'
import { formatDate } from '@/lib/utils'

interface PostListProps {
	fetchData: () => Promise<PostWithData[]>
}

export default async function PostList({ fetchData }: PostListProps) {
	const posts = await fetchData()

	const renderedPosts = posts.map((post) => {
		const topicSlug = post.topic.slug

		if (!topicSlug) {
			throw new Error('Need a slug to link to a post')
		}

		return (
			<div
				key={post.id}
				className="border border-white rounded-xl bg-dark-2 p-5 flex flex-col space-y-4"
			>
				<div className="flex items-start gap-4">
					{' '}
					{/* Changed from 'items-center' to 'items-start' */}
					
					<Link href={`/profile/${post.userId}`} className="relative h-10 w-10">

						<Image
							src={post.user.image || ''}
							alt="user image"
							fill
							className="rounded-full object-cover"
						/>

					</Link>

					<div className="flex flex-col">
						<Link href={`/profile/${post.userId}`}>
							<p className="text-sm font-light text-light-1">{post.user.name}</p>
						</Link>
						<p className="text-xs text-gray-400">
							{formatDate(post.createdAt)}
						</p>
					</div>
				</div>

				<Link href={paths.postShow(topicSlug, post.id)}>
					<h3 className="text-9xl font-bold text-light-1">{post.title}</h3>
				</Link>
				<div className="flex flex-row gap-8">
					<p className="text-xs text-gray-400">
						{post._count.comments} comments
					</p>
				</div>
			</div>
		)
	})

	return <div className="space-y-4">{renderedPosts}</div>
}
