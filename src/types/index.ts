// types.ts
export type Topic = {
	id: string
	slug: string
	description: string
	createdAt: string // Keep this as string if you store dates as strings
	updatedAt: string
}
