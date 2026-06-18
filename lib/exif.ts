import * as exifr from "exifr";
import { format } from "date-fns";

import type { PhotoMetadata } from "./types";

export async function extractExif(
  filePath: string,
  fileName: string
): Promise<PhotoMetadata> {

  const exif =
    await exifr.parse(
      filePath,
      true
    );

  const dateValue =
    exif?.DateTimeOriginal ||
    exif?.CreateDate ||
    exif?.ModifyDate ||
    new Date();

  const date =
    new Date(dateValue);

  return {
    fileName,

    timestamp:
      date.getTime(),

    dateTaken:
      format(date, "yyyy-MM-dd"),

    timeTaken:
      format(date, "HH:mm:ss"),

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
