import  db from '@/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils' // Make sure to import the correct function

interface PostShowProps {
	postId: string
}

export default async function PostShow({ postId }: PostShowProps) {
	const post = await db.post.findFirst({
		where: { id: postId },
		include: {
			user: true, // Assuming that there is a user relation in your post model
		},
	})

	if (!post) {
		notFound()
	}

	return (
		<article className="flex w-full flex-col rounded-xl bg-dark-2 p-7 m-4">
			<div className="flex items-start justify-between">
				<div className="flex w-full flex-1 flex-row gap-4">
					{post.user && (
						<div className="flex flex-col items-center">
							<Link
								href={`/profile/${post.userId}`}
								className="relative h-11 w-11"
							>
								<Image
									src={post.user.image || ''}
									alt="user image"
									fill
									className="cursor-pointer rounded-full"
								/>
							</Link>
							<div className="thread-card_bar" />
						</div>
					)}

					<div className="flex w-full flex-col">
						{post.user && (
							<Link href={`/profile/${post.userId}`} className="w-fit">
								<p className="cursor-pointer text-light-1">{post.user.name}</p>
							</Link>
						)}

						<h1 className="text-9xl font-bold my-2">{post.title}</h1>
						<p className="mt-2 text-small-regular text-light-2">
							{post.content}
						</p>

						<div className="mt-5 flex flex-col gap-3">
							<p className="text-subtle-medium text-gray-1">
								{formatDate(post.createdAt)}
							</p>
						</div>
					</div>
				</div>
			</div>
		</article>
	)
}
