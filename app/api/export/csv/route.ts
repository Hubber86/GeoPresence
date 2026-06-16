import { NextResponse } from "next/server";

import { getAttendanceReport } from "@/lib/report";
import { createCsv } from "@/lib/exports";

export async function GET() {
  try {
    const report =
      await getAttendanceReport();

    const csv =
      createCsv(report);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type":
          "text/csv",

        "Content-Disposition":
          'attachment; filename="attendance-report.csv"',

        "Cache-Control":
          "no-store",
      },
    });
  } catch (error) {
    console.error(
      "CSV export failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to generate CSV report",
      },
      {
        status: 500,
      }
    );
  }
}
