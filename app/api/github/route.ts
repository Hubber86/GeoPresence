import { NextResponse } from "next/server";

import { getPhotoMetadata } from "@/lib/photos";
import { getAttendanceReport } from "@/lib/report";

export const runtime = "nodejs";

export async function GET() {
  try {
    const photos = await getPhotoMetadata();

    const report =
      await getAttendanceReport();

    return NextResponse.json({
      success: true,

      application: "GeoPresence",

      version: "1.0.0",

      repositorySource: "photos/",

      deployment: {
        platform: "Vercel",
        database: false,
      },

      statistics: {
        totalPhotos:
          photos.length,

        totalAttendanceDays:
          report.length,
      },

      timestamp:
        new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to fetch repository information",
      },
      {
        status: 500,
      }
    );
  }
}
