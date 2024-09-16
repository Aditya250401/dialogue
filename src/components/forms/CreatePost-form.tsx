'use client'

import { Check } from 'lucide-react'
import * as actions from '@/actions'
import FormButton from '@/components/components/FormButton'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPostSchema } from '@/validations/post'
import { useFormState } from 'react-dom'

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import * as React from 'react'
import { cn } from '@/lib/utils'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import type { Topic } from '@prisma/client'

type CreateTopicProps = {
	topics: Topic[]
}

export function PostCreateForm({ topics = [] }: CreateTopicProps) {
	const [open, setOpen] = React.useState(false)
	const [selectedTopic, setSelectedTopic] = React.useState<string>('')

	const [formState, action] = useFormState(
		actions.createPost.bind(null, selectedTopic),
		{
			errors: {},
		}
	)

	const form = useForm<z.infer<typeof createPostSchema>>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			title: '',
			slug: '',
			content: '',
		},
	})

	return (
		<Form {...form}>
			<form action={action} className="space-y-6">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Title" {...field} />
							</FormControl>
							<FormDescription>This is the title of the post.</FormDescription>

							{formState.errors.title ? (
								<FormMessage>{formState.errors.title.join(', ')}</FormMessage>
							) : null}
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="slug"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Topic</FormLabel>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										size="sm"
										className="w-[300px] justify-start"
									>
										{field.value
											? topics.find((topic) => topic.slug === field.value)?.slug
											: 'Select topic'}
									</Button>
								</PopoverTrigger>
								<PopoverContent
									className="p-0 bg-dark-3"
									side="right"
									align="start"
								>
									<Command>
										<CommandInput placeholder="Search topics..." />
										<CommandList>
											<CommandEmpty>No results found.</CommandEmpty>
											<CommandGroup>
												{topics.map((topic) => (
													<CommandItem
														value={topic.slug}
														key={topic.slug}
														onSelect={() => {
															form.setValue('slug', topic.slug)
															setSelectedTopic(topic.slug)
															setOpen(false)
														}}
													>
														<Check
															className={cn(
																'mr-2 h-4 w-4',
																topic.slug === field.value
																	? 'opacity-100'
																	: 'opacity-0'
															)}
														/>
														{topic.slug}
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<FormDescription>
								This is the Topic for which you are creating a post.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="content"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col gap-3">
							<FormLabel className="text-base-semibold text-light-2">
								Content
							</FormLabel>
							<FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
								<Textarea rows={15} {...field} />
							</FormControl>

							{formState.errors.content ? (
								<FormMessage>{formState.errors.content.join(', ')}</FormMessage>
							) : null}
						</FormItem>
					)}
				/>
				{formState.errors._form ? (
					<div className="rounded text-red p-2 bg-red-200 border border-red-400">
						{formState.errors._form?.join(', ')}
					</div>
				) : null}
				<FormButton />
			</form>
		</Form>
	)
}
