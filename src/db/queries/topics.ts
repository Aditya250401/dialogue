import  db  from '@/db'
import type { Topic } from '@prisma/client'
import { cache } from 'react'

export const fetchTopics = cache((): Promise<Topic[]> => {
	return db.topic.findMany()
})
