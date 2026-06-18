// import * as exifr from "exifr";
// import { format } from "date-fns";

// import { extractGpsFromImage } from "./ocrGps";

// import type { PhotoMetadata } from "./types";

// export async function extractExif(
//   filePath: string,
//   fileName: string
// ): Promise<PhotoMetadata> {
//   try {
//     const exif = await exifr.parse(filePath, {
//       gps: true,
//       tiff: true,
//       exif: true,
//       xmp: true,
//       icc: false,
//       iptc: false,
//     });

//     let latitude: number | undefined = exif?.latitude;
//     let longitude: number | undefined = exif?.longitude;

//     let city = "";
//     // let district = "";
//     let state = "";
//     let country = "";
//     let postalCode = "";
//     let address = "";

//     /*
//      * OCR fallback when EXIF GPS missing
//      */
//     if (
//       latitude == null ||
//       longitude == null
//     ) {
//       console.log(
//         `[OCR FALLBACK] ${fileName}`
//       );

//       try {
//         const ocr =
//           await extractGpsFromImage(
//             filePath
//           );

//         latitude =
//           ocr?.latitude ??
//           latitude;

//         longitude =
//           ocr?.longitude ??
//           longitude;

//         city =
//           ocr?.city ?? "";

//         // district =
//         //   ocr?.district ?? "";

//         state =
//           ocr?.state ?? "";

//         country =
//           ocr?.country ?? "";

//         postalCode =
//           ocr?.postalCode ?? "";

//         address =
//           ocr?.address ?? "";

//         console.log(
//           `[OCR RESULT] ${fileName}`,
//           {
//             latitude,
//             longitude,
//             city,
//             state,
//             postalCode,
//           }
//         );
//       } catch (ocrError) {
//         console.error(
//           `[OCR ERROR] ${fileName}`,
//           ocrError
//         );
//       }
//     }

//     const dateValue =
//       exif?.DateTimeOriginal ||
//       exif?.CreateDate ||
//       exif?.ModifyDate ||
//       new Date();

//     const date =
//       new Date(dateValue);

//     return {
//       fileName,

//       timestamp:
//         date.getTime(),

//       dateTaken:
//         format(
//           date,
//           "yyyy-MM-dd"
//         ),

//       timeTaken:
//         format(
//           date,
//           "HH:mm:ss"
//         ),

//       latitude,
//       longitude,

//       camera: [
//         exif?.Make,
//         exif?.Model,
//       ]
//         .filter(Boolean)
//         .join(" ")
//         .trim(),

//       address,

//       city,

//       // district,

//       state,

//       country,

//       postalCode,
//     };
//   } catch (error) {
//     console.error(
//       `[EXIF ERROR] ${fileName}`,
//       error
//     );

//     const now = new Date();

//     return {
//       fileName,

//       timestamp:
//         now.getTime(),

//       dateTaken:
//         format(
//           now,
//           "yyyy-MM-dd"
//         ),

//       timeTaken:
//         format(
//           now,
//           "HH:mm:ss"
//         ),

//       latitude: undefined,
//       longitude: undefined,

//       camera: "",

//       address: "",
//       city: "",
//       // district: "",
//       state: "",
//       country: "",
//       postalCode: "",
//     };
//   }
// }

import * as exifr from "exifr";
import { format } from "date-fns";

import type { PhotoMetadata } from "./types";

export async function extractExif(
  filePath: string,
  fileName: string
): Promise<PhotoMetadata> {
  try {
    const exif = await exifr.parse(
      filePath,
      {
        gps: true,
        tiff: true,
        exif: true,
        xmp: true,
        icc: false,
        iptc: false,
      }
    );

    const latitude =
      exif?.latitude;

    const longitude =
      exif?.longitude;

    const dateValue =
      exif?.DateTimeOriginal ||
      exif?.CreateDate ||
      exif?.ModifyDate ||
      new Date();

    const date =
      new Date(dateValue);

    /*
     * IMPORTANT
     *
     * No OCR here.
     *
     * Homepage should load fast.
     * OCR is executed separately
     * through /api/ocr/process
     */

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
      state: "",
      country: "",
      postalCode: "",
    };
  } catch (error) {
    console.error(
      `[EXIF ERROR] ${fileName}`,
      error
    );

    const now =
      new Date();

    return {
      fileName,

      timestamp:
        now.getTime(),

      dateTaken:
        format(
          now,
          "yyyy-MM-dd"
        ),

      timeTaken:
        format(
          now,
          "HH:mm:ss"
        ),

      latitude:
        undefined,

      longitude:
        undefined,

      camera: "",

      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    };
  }
}
