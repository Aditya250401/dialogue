import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Providers from '@/app/(root)/providers'
import Topbar from '@/components/bars/Topbar'
import LeftSideBar from '@/components/bars/LeftSideBar'
import RightSideBar from '@/components/bars/RightSideBar'
import BottomBar from '@/components/bars/BottomBar'

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>
				<Providers>
					<Topbar />

					<main className="flex flex-row">
						<LeftSideBar />
						<section className="main-container">
							<div className="w-full max-w-4xl">{children}</div>
						</section>
						{/* @ts-ignore */}
						<RightSideBar />
					</main>

					<BottomBar />
				</Providers>
			</body>
		</html>
	)
}
