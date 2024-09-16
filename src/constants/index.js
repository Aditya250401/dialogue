import homeImage from '@/assets/home.svg'
import searchImage from '@/assets/search.svg'
import heartImage from '@/assets/heart.svg'
import createImage from '@/assets/create.svg'
import communityImage from '@/assets/community.svg'

export const sidebarLinks = [
	{
		imgURL: homeImage,
		route: '/',
		label: 'Home',
	},
	{
		imgURL: searchImage,
		route: '/search',
		label: 'Search',
	},
	{
		imgURL: heartImage,
		route: '/activity',
		label: 'Activity',
	},
	{
		imgURL: createImage,
		route: '/create-post',
		label: 'Create Post',
	},
	{
		imgURL: communityImage,
		route: '/communities',
		label: 'Communities',
	},
]

export const profileTabs = [
	{ value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
	{ value: 'replies', label: 'Replies', icon: '/assets/members.svg' },
	{ value: 'tagged', label: 'Tagged', icon: '/assets/tag.svg' },
]

export const communityTabs = [
	{ value: 'threads', label: 'Threads', icon: '/assets/reply.svg' },
	{ value: 'members', label: 'Members', icon: '/assets/members.svg' },
	{ value: 'requests', label: 'Requests', icon: '/assets/request.svg' },
]
