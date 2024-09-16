import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import CommentCreateForm from '@/components/comments/comment-create-form'
import { fetchCommentsByPostId } from '@/db/queries/comment'

interface CommentShowProps {
	commentId: string
	postId: string
}

export default async function CommentShow({
	commentId,
	postId,
}: CommentShowProps) {
	const comments = await fetchCommentsByPostId(postId)
	const comment = comments.find((c) => c.id === commentId)

	if (!comment) {
		return null
	}

	const children = comments.filter((c) => c.parentId === commentId)
	const renderedChildren = children.map((child) => {
		return <CommentShow key={child.id} commentId={child.id} postId={postId} />
	})

	return (
		<article className="flex w-full flex-col rounded-xl bg-dark-2 p-7">
			<div className="flex items-start justify-between">
				<div className="flex w-full flex-1 flex-row gap-4">
					<div className="flex flex-col items-center">
						<Link
							href={`/profile/${comment.userId}`}
							className="relative h-11 w-11"
						>
							<Image
								src={comment.user.image || ''}
								alt="user image"
								fill
								className="cursor-pointer rounded-full"
							/>
						</Link>
						<div className="thread-card_bar" />
					</div>

					<div className="flex w-full flex-col">
						<Link href={`/profile/${comment.userId}`} className="w-fit">
							<h4 className="cursor-pointer text-base-semibold text-light-1">
								{comment.user.name}
							</h4>
						</Link>

						<p className="mt-2 text-small-regular text-light-2">
							{comment.content}
						</p>

						<div className="mt-5 flex flex-col gap-3">
							{children.length > 0 && (
								<p className="mt-1 text-subtle-medium text-gray-1"></p>
							)}
						</div>
					</div>
				</div>
			</div>
			{children.length > 0 && (
				<div className="ml-1 mt-3 flex items-center gap-2">
					{children.slice(0, 2).map((child, index) => (
						<Image
							key={index}
							src={child.user.image || ''}
							alt={`user_${index}`}
							width={24}
							height={24}
							className={`${index !== 0 && '-ml-5'} rounded-full object-cover`}
						/>
					))}

					<p className="mt-1 text-subtle-medium text-gray-1">
						{children.length} repl{children.length > 1 ? 'ies' : 'y'}
					</p>
				</div>
			)}

			<div className="mt-5 flex items-center">
				<p className="text-subtle-medium text-gray-1">
					{formatDate(comment.createdAt)}
				</p>
			</div>

			<div className="pl-4">{renderedChildren}</div>

			<CommentCreateForm postId={comment.postId} parentId={comment.id} />
			
		</article>
	)
}
