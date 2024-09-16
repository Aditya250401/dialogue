import Image from 'next/image'
import Link from 'next/link'
import HeaderAuth from './header-auth'
import logo from '@/assets/logo.svg'
import { MobileNav } from '../components/mobile-nav'
import { fetchTopics } from '@/db/queries/topics'
import SearchInput from '@/components/components/SearchInput'
import { Suspense } from 'react'

async function Topbar() {
	const topics = await fetchTopics()

	return (
		<nav className="topbar">
			<Link href="/" className="flex items-center gap-4">
				<Image src={logo} alt="logo" width={28} height={28} />
				<p className="text-heading1-bold text-light-1 max-xs:hidden">
					Dialogue
				</p>
			</Link>
			<div className="w-full justify-center flex-1 md:w-auto md:flex-none">
				<Suspense>
					<SearchInput />
				</Suspense>
			</div>

			<div className="flex items-center gap-1">
				<div className="block ">
					<HeaderAuth />
				</div>
				<div className="block m-1">
					<MobileNav topics={topics} />
				</div>
			</div>
		</nav>
	)
}

export default Topbar
