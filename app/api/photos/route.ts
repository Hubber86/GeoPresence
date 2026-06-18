export const runtime = "nodejs";

import { NextResponse }
from "next/server";

import { getPhotos }
from "@/lib/photoScanner";

import { extractExif }
from "@/lib/exif";

import { extractGpsFromImage }
from "@/lib/ocrGps";

import { reverseGeocode }
from "@/lib/geocoder";

export async function GET() {

  const files =
    getPhotos();

  const results = [];

  for (const file of files) {

    const exif =
      await extractExif(
        file.path,
        file.name
      );

    let latitude =
      exif.latitude;

    let longitude =
      exif.longitude;

    if (
      latitude == null ||
      longitude == null
    ) {

      const ocr =
        await extractGpsFromImage(
          file.path
        );

      latitude =
        ocr.latitude;

      longitude =
        ocr.longitude;
    }

    let geo = {};

    if (
      latitude != null &&
      longitude != null
    ) {

      geo =
        await reverseGeocode(
          latitude,
          longitude
        );
    }

    results.push({

      ...exif,

      latitude,
      longitude,

      ...geo,

    });
  }

  return NextResponse.json(
    results
  );
}
