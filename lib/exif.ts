import * as exifr from "exifr";
import { format } from "date-fns";

import { extractGpsFromImage } from "./ocrGps";

import type { PhotoMetadata } from "./types";

export async function extractExif(
  filePath: string,
  fileName: string
): Promise<PhotoMetadata> {
  try {
    const exif = await exifr.parse(filePath, {
      gps: true,
      tiff: true,
      exif: true,
      xmp: true,
      icc: false,
      iptc: false,
    });

    let latitude: number | undefined =
      exif?.latitude;

    let longitude: number | undefined =
      exif?.longitude;

    /*
     * Fallback to OCR only if GPS
     * not available in EXIF
     */
    if (
      latitude == null ||
      longitude == null
    ) {
      console.log(
        `[OCR FALLBACK] ${fileName}`
      );

      const ocr =
        await extractGpsFromImage(
          filePath
        );

      latitude =
        ocr.latitude;

      longitude =
        ocr.longitude;

      console.log(
        `[OCR RESULT] ${fileName}`,
        {
          latitude,
          longitude,
        }
      );
    }

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
  } catch (error) {
    console.error(
      `[EXIF ERROR] ${fileName}`,
      error
    );

    return {
      fileName,

      timestamp:
        Date.now(),

      dateTaken:
        format(
          new Date(),
          "yyyy-MM-dd"
        ),

      timeTaken:
        format(
          new Date(),
          "HH:mm:ss"
        ),

      latitude: undefined,
      longitude: undefined,

      camera: "",

      address: "",
      city: "",
      district: "",
      state: "",
      country: "",
      postalCode: "",
    };
  }
}
