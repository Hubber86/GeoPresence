export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { getPhotos } from "@/lib/photoScanner";
import { extractExif } from "@/lib/exif";
import { reverseGeocode } from "@/lib/geocoder";

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

    console.log(
      "PHOTO:",
      file.name
    );

    console.log(
      "LAT:",
      exif.latitude
    );

    console.log(
      "LON:",
      exif.longitude
    );

    let geo = {};

    if (
      exif.latitude != null &&
      exif.longitude != null
    ) {

      geo =
        await reverseGeocode(
          exif.latitude,
          exif.longitude
        );

      console.log(
        "GEO:",
        geo
      );

    } else {

      console.log(
        "GPS NOT FOUND"
      );
    }

    results.push({
      ...exif,
      ...geo,
    });
  }

  return NextResponse.json(
    results
  );
}
