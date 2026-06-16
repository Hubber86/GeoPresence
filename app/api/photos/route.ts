import { NextResponse }
from "next/server";

import { getPhotos }
from "@/lib/photoScanner";

import { extractExif }
from "@/lib/exif";

import { reverseGeocode }
from "@/lib/geocoder";

export async function GET() {

  const files = getPhotos();

  const results = [];

  for (const file of files) {

  const exif =
    await extractExif(
      file.path,
      file.name
    );

    let geo = {};

    if (
      exif.latitude &&
      exif.longitude
    ) {
      geo =
        await reverseGeocode(
          exif.latitude,
          exif.longitude
        );
    }

    results.push({
      fileName: file.name,
      ...exif,
      ...geo
    });
  }

  return NextResponse.json(results);
}
