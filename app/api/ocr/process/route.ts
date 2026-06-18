import { NextResponse }
from "next/server";

import { getPhotos }
from "@/lib/photoScanner";

import { extractGpsFromImage }
from "@/lib/ocrGps";

export async function POST() {

  try {

    const files =
      getPhotos();

    const results = [];

    for (
      const file
      of files
    ) {

      const data =
        await extractGpsFromImage(
          file.path
        );

      results.push({
        file: file.name,
        ...data,
      });
    }

    return NextResponse.json({
      success: true,
      processed:
        results.length,
      results,
    });

  } catch (error) {

    console.error(
      "OCR API ERROR",
      error
    );

    return NextResponse.json(
      {
        success: false,
      },
      {
        status: 500,
      }
    );
  }
}
