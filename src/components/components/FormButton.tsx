import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { useFormStatus } from 'react-dom'

export default function FormButton() {
	const { pending } = useFormStatus()
	return (
		<Button type="submit" variant="outline">
			{pending ? (
				<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<Icons.save className="mr-3 h-4 w-4" />
			)}
			{''}
			Save
		</Button>
	)
}
