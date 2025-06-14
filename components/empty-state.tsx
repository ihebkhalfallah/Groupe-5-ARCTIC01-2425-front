import { UsersIcon } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
      <div className="bg-muted p-4 rounded-full mb-4">
        <UsersIcon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-1">No students found</h3>
      <p className="text-sm text-muted-foreground mb-4">There are no students available from the API at this time.</p>
    </div>
  )
}
