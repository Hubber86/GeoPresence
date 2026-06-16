import { NextResponse } from "next/server";

import { getAttendanceReport } from "@/lib/report";
import { createExcel } from "@/lib/exports";

export async function GET() {
  try {
    const report =
      await getAttendanceReport();

    const excelData =
      createExcel(report);

    const arrayBuffer =
      new ArrayBuffer(
        excelData.byteLength
      );

    new Uint8Array(
      arrayBuffer
    ).set(excelData);

    return new Response(
      arrayBuffer,
      {
        status: 200,
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

          "Content-Disposition":
            'attachment; filename="attendance-report.xlsx"',

          "Cache-Control":
            "no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "Excel export failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to generate Excel report",
      },
      {
        status: 500,
      }
    );
  }
}
