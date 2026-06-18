import * as exifr from "exifr";
import { format } from "date-fns";

import { extractGpsFromImage } from "./ocrGps";

import type { PhotoMetadata } from "./types";

export async function extractExif(
  filePath: string,
  fileName: string
): Promise<PhotoMetadata> {

  let exif: any = {};

  try {
    exif = await exifr.parse(
      filePath,
      true
    );
  } catch (error) {
    console.error(
      `EXIF read failed for ${fileName}`,
      error
    );
  }

  let latitude =
    exif?.latitude;

  let longitude =
    exif?.longitude;

  let city = "";
  let state = "";
  let postalCode = "";
  let country = "";
  let address = "";

  // OCR fallback if EXIF GPS missing
  if (
    latitude == null ||
    longitude == null
  ) {

    console.log(
      `No EXIF GPS found for ${fileName}. Running OCR...`
    );

    const ocr =
      await extractGpsFromImage(
        filePath
      );

    latitude =
      ocr.latitude;

    longitude =
      ocr.longitude;

    city =
      ocr.city || "";

    state =
      ocr.state || "";

    postalCode =
      ocr.postalCode || "";

    country =
      city || state
        ? "India"
        : "";
  }

  const dateValue =
    exif?.DateTimeOriginal ||
    exif?.CreateDate ||
    exif?.ModifyDate ||
    new Date();

  const date =
    new Date(dateValue);

  const camera =
    [
      exif?.Make,
      exif?.Model,
    ]
      .filter(Boolean)
      .join(" ")
      .trim();

  console.log({
    fileName,
    latitude,
    longitude,
    city,
    state,
    postalCode,
  });

  return {

    fileName,

    timestamp:
      date.getTime(),

    dateTaken:
      format(
        date,
        "yyyy-MM-dd"
      ),

    timeTaken:
      format(
        date,
        "HH:mm:ss"
      ),

    latitude,
    longitude,

    camera,

    address,
    city,
    district: "",
    state,
    country,
    postalCode,
  };
}
