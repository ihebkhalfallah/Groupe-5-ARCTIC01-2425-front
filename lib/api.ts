import type { Student } from "./types";

const BASE_URL =
  typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:3000";
const API_URL = `${BASE_URL}/api/students`;

export async function getUniversites() {
  const res = await fetch("http://localhost:8086/Foyer/universite/findAll", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch universites");
  }
  return res.json();
}

// Delete a universite by ID
export async function deleteUniversite(idUniversite: number) {
  const res = await fetch(
    (process.env.NEXT_PUBLIC_UNIVERSITE_API_URL?.replace(
      "addOrUpdate",
      "deleteById"
    ) || "http://localhost:8086/Foyer/universite/deleteById") +
      `?id=${idUniversite}`,
    {
      method: "DELETE",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to delete universite");
  }
  return res;
}

// Update a universite (expects full universite object)
export async function updateUniversite(universite: {
  idUniversite: number;
  nomUniversite: string;
  adresse: string;
  // add other fields if needed
}) {
  const res = await fetch(
    process.env.NEXT_PUBLIC_UNIVERSITE_API_URL ||
      "http://localhost:8086/Foyer/universite/addOrUpdate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(universite),
    }
  );
  if (!res.ok) {
    throw new Error("Failed to update universite");
  }
  return res.json();
}
