import { NextResponse } from "next/server";
import { getAttendanceReport } from "@/lib/report";

export async function GET() {
  try {
    const report = await getAttendanceReport();

    return new NextResponse(
      JSON.stringify(report, null, 2),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition":
            'attachment; filename="attendance-report.json"',
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "JSON export failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to generate JSON report",
      },
      {
        status: 500,
      }
    );
  }
}
