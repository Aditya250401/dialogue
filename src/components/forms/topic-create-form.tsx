'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { createTopicSchema } from '@/validations/topic'
import * as actions from '@/actions'
import { useFormState } from 'react-dom'
import { Textarea } from '@/components/ui/textarea'
import FormButton from '../components/FormButton'

export default function TopicCreateForm() {
	const [formState, action] = useFormState(actions.createTopic, {
		errors: {},
	})

	const form = useForm<z.infer<typeof createTopicSchema>>({
		resolver: zodResolver(createTopicSchema),
	})

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline">Create Topic</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create a topic to share dialogues</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form action={action} className="space-y-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Topic</FormLabel>
									<FormControl>
										<Input placeholder="javascript" {...field} />
									</FormControl>
									<FormDescription>
										This is the name of the topic.
									</FormDescription>
									{formState.errors.name ? (
										<FormMessage>
											<p className="text-red-500">
												{formState.errors.name.join(', ')}
											</p>
										</FormMessage>
									) : null}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder="A computer language" {...field} />
									</FormControl>
									<FormDescription>What is this topic about?</FormDescription>
									{formState.errors.description ? (
										<FormMessage>
											<p className='text-red-500'>{formState.errors.description.join(', ')}</p>
										</FormMessage>
									) : null}
								</FormItem>
							)}
						/>
						{formState.errors._form ? (
							<div className="rounded p-2 bg-red-200 border border-red-400">
								{formState.errors._form?.join(', ')}
							</div>
						) : null}

						<DialogFooter>
							<FormButton />
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
