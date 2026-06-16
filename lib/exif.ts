import * as exifr from "exifr";
import { format } from "date-fns";

import type { PhotoMetadata } from "./types";

// import { extractGpsFromImage } from "./ocrGps";

export async function extractExif(
  filePath: string,
  fileName: string
): Promise<PhotoMetadata> {
  const exif = await exifr.parse(filePath, true);

  let latitude = exif?.latitude;
  let longitude = exif?.longitude;

  if (latitude == null || longitude == null) {
    // const ocr = await extractGpsFromImage(filePath);

    // latitude = ocr.latitude;
    // longitude = ocr.longitude;
  }

  const dateValue =
    exif?.DateTimeOriginal ||
    exif?.CreateDate ||
    exif?.ModifyDate ||
    new Date();

  const date = new Date(dateValue);

  return {
    fileName,

    timestamp: date.getTime(),

    dateTaken: format(date, "yyyy-MM-dd"),

    timeTaken: format(date, "HH:mm:ss"),

    latitude,
    longitude,

    camera: [exif?.Make, exif?.Model]
      .filter(Boolean)
      .join(" ")
      .trim(),

    address: "",
    city: "",
    district: "",
    state: "",
    country: "",
    postalCode: "",
  };
}
