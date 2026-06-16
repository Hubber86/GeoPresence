import * as exifr from "exifr";

import { format } from "date-fns";

import { PhotoMetadata } from "./types";

export async function extractExif(
  filePath: string,
  fileName: string
): Promise<PhotoMetadata> {
  const exif = await exifr.parse(
    filePath,
    {
      gps: true,
    }
  );

  const date =
    exif?.DateTimeOriginal ||
    exif?.CreateDate ||
    new Date();

  return {
    fileName,

    timestamp:
      new Date(date).getTime(),

    dateTaken: format(
      date,
      "yyyy-MM-dd"
    ),

    timeTaken: format(
      date,
      "HH:mm:ss"
    ),

    latitude:
      exif?.latitude,

    longitude:
      exif?.longitude,

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
