"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addStudent } from "@/lib/actions";
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

export function AddStudentForm() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const studentData = {
        nomEt: (form.elements.namedItem("nomEt") as HTMLInputElement).value,
        prenomEt: (form.elements.namedItem("prenomEt") as HTMLInputElement)
          .value,
        cin: (form.elements.namedItem("cin") as HTMLInputElement).value,
        email: (form.elements.namedItem("email") as HTMLInputElement).value,
        ecole: (form.elements.namedItem("ecole") as HTMLInputElement).value,
        dateNaissance: (
          form.elements.namedItem("dateNaissance") as HTMLInputElement
        ).value,
      };

      const result = await addStudent(studentData);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        setOpen(false);
        router.refresh(); // Refresh the page to show the new student
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add student. Please try again.",
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
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              Fill in the student details and click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nomEt">Last Name *</Label>
                <Input id="nomEt" name="nomEt" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenomEt">First Name *</Label>
                <Input id="prenomEt" name="prenomEt" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cin">CIN *</Label>
              <Input id="cin" name="cin" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ecole">School</Label>
              <Input id="ecole" name="ecole" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateNaissance">Date of Birth</Label>
              <Input id="dateNaissance" name="dateNaissance" type="date" />
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
