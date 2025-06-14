import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "http://192.168.215.140:8086/Foyer/etudiant/findAll",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `API request failed with status: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    // Try to parse as JSON, but handle if it's not valid JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse response as JSON:", text);
      return NextResponse.json(
        {
          error: "Invalid JSON response from API",
          responseText: text.substring(0, 500),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch students:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch students",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const studentData = await request.json();

    const response = await fetch(
      "http://192.168.215.140:8086/Foyer/etudiant/addOrUpdate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: studentData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `API request failed with status: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    // Try to parse as JSON, but handle if it's not valid JSON
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse response as JSON:", text);
      // If the API returns a non-JSON success response, we'll consider it successful
      if (response.ok) {
        return NextResponse.json({
          success: true,
          message: "Student added successfully",
        });
      }
      return NextResponse.json(
        {
          error: "Invalid JSON response from API",
          responseText: text.substring(0, 500),
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data || { success: true });
  } catch (error) {
    console.log("Failed to add student:", error);
    return NextResponse.json(
      {
        error: "Failed to add student",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
