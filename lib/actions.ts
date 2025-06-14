"use server";

import { revalidatePath } from "next/cache";

interface StudentData {
  nomEt: string;
  prenomEt: string;
  cin: string;
  email: string;
  ecole?: string;
  dateNaissance?: string;
}

export async function addStudent(
  studentData: StudentData
): Promise<{ success: boolean; message: string }> {
  try {
    if (
      !studentData.nomEt ||
      !studentData.prenomEt ||
      !studentData.cin ||
      !studentData.email
    ) {
      return { success: false, message: "Please fill in all required fields" };
    }

    const BASE_URL =
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const response = await fetch(
      `${BASE_URL}/api/students`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studentData),
      }
    );

    if (!response.ok) {
      try {
        const errorData = await response.json();
        return {
          success: false,
          message:
            errorData.error || `Failed to add student: ${response.status}`,
        };
      } catch (e) {
        return {
          success: false,
          message: `Failed to add student: ${response.status}`,
        };
      }
    }

    // Revalidate the students list page to show the new student
    revalidatePath("/");

    return { success: true, message: "Student added successfully" };
  } catch (error) {
    console.error("Error adding student:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
