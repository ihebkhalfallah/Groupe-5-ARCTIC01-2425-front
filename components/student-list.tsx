import { getUniversites } from "@/lib/api";
import { EmptyState } from "./empty-state";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AddUniversiteForm } from "./add-universite-form";
import { UniversiteCard } from "./universite-card";

export async function StudentList() {
  try {
    const universites = await getUniversites();

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            All Universites ({universites.length})
          </h2>
          <AddUniversiteForm />
        </div>

        {universites.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {universites.map((universite: any) => (
              <UniversiteCard
                key={universite.idUniversite}
                universite={universite}
              />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load universite data. Please try again later or contact
          support.
        </AlertDescription>
      </Alert>
    );
  }
}
