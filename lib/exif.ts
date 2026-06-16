import * as exifr from "exifr";

import { format } from "date-fns";

import { extractGpsFromImage }
  from "./ocrGps";

import type {
  PhotoMetadata,
} from "./types";

export async function extractExif(
  filePath: string,
  fileName: string
): Promise<PhotoMetadata> {

  const exif =
    await exifr.parse(
      filePath,
      true
    );

  let latitude =
    exif?.latitude;

  let longitude =
    exif?.longitude;

  if (
    !latitude ||
    !longitude
  ) {
    const ocr =
      await extractGpsFromImage(
        filePath
      );

    latitude =
      ocr.latitude;

    longitude =
      ocr.longitude;
  }

  const date =
    exif?.DateTimeOriginal ||
    exif?.CreateDate ||
    exif?.ModifyDate ||
    new Date();

  return {
    fileName,

    timestamp:
      new Date(date).getTime(),

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

    camera: [
      exif?.Make,
      exif?.Model,
    ]
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
