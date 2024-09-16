import Link from 'next/link'
import PostShow from '@/components/posts/post-show'
import CommentList from '@/components/comments/comment-list'
import CommentCreateForm from '@/components/comments/comment-create-form'
import paths from '@/paths'
import { Suspense } from 'react'
import PostShowLoading from '@/components/posts/post-show-loading'

interface PostShowPageProps {
	params: {
		slug: string
		postId: string
	}
}

export default async function PostShowPage({ params }: PostShowPageProps) {
	const { slug, postId } = params

	const decodedSlug = decodeURIComponent(slug)

	return (
		<div className="space-y-3">
			<Link className="underline decoration-solid" href={paths.topicShow(slug)}>
				{'< '} <p className="text-xl">{decodedSlug}</p>
			</Link>
			<Suspense fallback={<PostShowLoading />}>
				<PostShow postId={postId} />
			</Suspense>
			<CommentCreateForm postId={postId} startOpen />
			<CommentList postId={postId} />
		</div>
	)
}
