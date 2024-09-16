import TopicCreateForm from '@/components/forms/topic-create-form'
import PostList from '@/components/posts/post-list'
import { fetchTopPosts } from '@/db/queries/posts'

import  db  from '@/db'
import { Suspense } from 'react'

export default async function Page() {
	const topics = await db.topic.findMany()

	return (
		<div className="grid grid-cols-4 gap-4 p-4">
			<div className="col-span-3">
				<TopicCreateForm />
				<h1 className="text-xl m-2">Top Posts</h1>
				<Suspense fallback={<div>Loading...</div>}>
					<PostList fetchData={fetchTopPosts} />
				</Suspense>
			</div>
		</div>
	)
}
