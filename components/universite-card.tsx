"use client";
import React, { useState } from "react";
import { updateUniversite, deleteUniversite } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

type Universite = {
  idUniversite: number;
  nomUniversite: string;
  adresse: string;
  // Add other fields if needed
};

export function UniversiteCard({ universite }: { universite: Universite }) {
  const [open, setOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formState, setFormState] = useState({
    nomUniversite: universite.nomUniversite,
    adresse: universite.adresse,
  });
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteUniversite(universite.idUniversite);
      toast({ title: "Deleted", description: "Universite deleted." });
      router.refresh();
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to delete universite.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await updateUniversite({
        idUniversite: universite.idUniversite,
        nomUniversite: formState.nomUniversite,
        adresse: formState.adresse,
      });
      toast({ title: "Updated", description: "Universite updated." });
      setOpen(false);
      router.refresh();
    } catch (e) {
      toast({
        title: "Error",
        description: "Failed to update universite.",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="rounded-lg border p-4 shadow-sm bg-white">
      <h3 className="text-lg font-bold text-blue-600">
        {universite.nomUniversite}
      </h3>
      <p className="text-sm text-gray-600">{universite.adresse}</p>
      {/* Add more fields here if needed */}
      <div className="flex gap-2 mt-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              Update
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update Universite</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label htmlFor="nomUniversite">Name</Label>
                <Input
                  id="nomUniversite"
                  name="nomUniversite"
                  value={formState.nomUniversite}
                  onChange={(e) =>
                    setFormState((s) => ({
                      ...s,
                      nomUniversite: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="adresse">Address</Label>
                <Input
                  id="adresse"
                  name="adresse"
                  value={formState.adresse}
                  onChange={(e) =>
                    setFormState((s) => ({
                      ...s,
                      adresse: e.target.value,
                    }))
                  }
                  required
                />
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                  {isUpdating ? "Saving..." : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Button
          size="sm"
          variant="destructive"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </div>
    </div>
  );
}
