import { TopicsSidebarNav } from '@/components/components/sidebar-nav'
import { ScrollArea } from '@/registry/new-york/ui/scroll-area'

import { fetchTopics } from '@/db/queries/topics'

export default async function RightSideBar() {
	const topics = await fetchTopics()

	return (
		<div className="border-b mt-5 max-lg:hidden rightsidebar">
			<div className="container flex-1 items-start md:grid md:grid-cols-[1fr 220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[1fr 240px_minmax(0,1fr)] lg:gap-10">
				<aside className="fixed top-14 right-0 z-30 ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
					<ScrollArea className="h-full py-6 pr-6 lg:py-8">
						<TopicsSidebarNav topics={topics} />
					</ScrollArea>
				</aside>
			</div>
		</div>
	)
}
