"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon } from "lucide-react";

export function AddUniversiteForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const universiteData = {
        nomUniversite: (
          form.elements.namedItem("nomUniversite") as HTMLInputElement
        ).value,
        adresse: (form.elements.namedItem("adresse") as HTMLInputElement).value,
      };

      const universiteBaseUrl =
        process.env.NEXT_PUBLIC_UNIVERSITE_BASE_URL || "http://localhost:8086";

      const response = await fetch(
        `${universiteBaseUrl}/Foyer/universite/addOrUpdate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(universiteData),
        }
      );
      const result = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Universite added successfully.",
        });
        setOpen(false);
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result?.message || "Failed to add universite.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add universite. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Add Universite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Universite</DialogTitle>
            <DialogDescription>
              Fill in the universite details and click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="nomUniversite">Name *</Label>
              <Input id="nomUniversite" name="nomUniversite" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adresse">Address *</Label>
              <Input id="adresse" name="adresse" required />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
