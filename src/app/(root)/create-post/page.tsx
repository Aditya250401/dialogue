import { auth } from '@/auth'
import { PostCreateForm } from '@/components/forms/CreatePost-form'
import { fetchTopics } from '@/db/queries/topics'

async function Page() {
	const topics = await fetchTopics()

	const session = await auth()
	if (!session) return null

	return (
		<>
			<h1 className="head-text">Create Posts</h1>

			<PostCreateForm topics={topics} />
		</>
	)
}

export default Page
