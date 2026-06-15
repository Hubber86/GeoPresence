import { NextResponse } from "next/server";

import { getPhotoMetadata } from "@/lib/photos";
import { getAttendanceReport } from "@/lib/report";

export const runtime = "nodejs";

export async function GET() {
  try {
    const startTime = Date.now();

    const photos = await getPhotoMetadata();

    const report = await getAttendanceReport();

    const duration =
      Date.now() - startTime;

    return NextResponse.json({
      success: true,

      timestamp:
        new Date().toISOString(),

      statistics: {
        totalPhotos:
          photos.length,

        totalAttendanceDays:
          report.length,

        processingTimeMs:
          duration,
      },

      message:
        "GeoPresence synchronization completed successfully",
    });
  } catch (error) {
    console.error(
      "GitHub sync error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Synchronization failed",
      },
      {
        status: 500,
      }
    );
  }
}
