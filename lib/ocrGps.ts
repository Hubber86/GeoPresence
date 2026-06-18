import Tesseract from "tesseract.js";

export interface OcrGpsResult {
  latitude?: number;
  longitude?: number;

  city?: string;
  state?: string;
  postalCode?: string;

  rawText?: string;
}

function isValidCoordinate(
  latitude?: number,
  longitude?: number
): boolean {

  if (
    latitude === undefined ||
    longitude === undefined
  ) {
    return false;
  }

  return (
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

export async function extractGpsFromImage(
  filePath: string
): Promise<OcrGpsResult> {

  try {

    console.log(
      `[OCR] Processing ${filePath}`
    );

    const {
      data: { text }
    } =
      await Tesseract.recognize(
        filePath,
        "eng"
      );

    const rawText =
      text || "";

    console.log(
      "[OCR] Extracted Text:"
    );

    console.log(rawText);

    let latitude:
      | number
      | undefined;

    let longitude:
      | number
      | undefined;

    let city = "";
    let state = "";
    let postalCode = "";

    const coordinatePatterns = [

      // Latitude:18.47105 Longitude:73.792701
      /Latitude\s*[:\-]?\s*([+-]?\d+\.\d+).*?Longitude\s*[:\-]?\s*([+-]?\d+\.\d+)/is,

      // Lat:18.47105 Long:73.792701
      /Lat\s*[:\-]?\s*([+-]?\d+\.\d+).*?Long\s*[:\-]?\s*([+-]?\d+\.\d+)/is,

      // Lat18.47105Long73.792701
      /Lat([+-]?\d+\.\d+)Long([+-]?\d+\.\d+)/is,

      // GPS Map Camera watermark
      /([+-]?\d{1,2}\.\d{4,})[^\d]+([+-]?\d{1,3}\.\d{4,})/is,
    ];

    for (
      const pattern
      of coordinatePatterns
    ) {

      const match =
        rawText.match(pattern);

      if (match) {

        const lat =
          Number(match[1]);

        const lon =
          Number(match[2]);

        if (
          isValidCoordinate(
            lat,
            lon
          )
        ) {

          latitude = lat;
          longitude = lon;

          console.log(
            `[OCR] GPS Found: ${latitude}, ${longitude}`
          );

          break;
        }
      }
    }

    const pinMatch =
      rawText.match(
        /\b\d{6}\b/
      );

    if (pinMatch) {
      postalCode =
        pinMatch[0];
    }

    const indiaPattern =
      /([A-Za-z ]+),\s*([A-Za-z ]+),\s*India/i;

    const locationMatch =
      rawText.match(
        indiaPattern
      );

    if (
      locationMatch
    ) {

      city =
        locationMatch[1]
          .trim();

      state =
        locationMatch[2]
          .trim();
    }

    if (
      !city ||
      !state
    ) {

      const lines =
        rawText
          .split("\n")
          .map(
            (line) =>
              line.trim()
          )
          .filter(Boolean);

      for (
        const line
        of lines
      ) {

        const match =
          line.match(
            /^([A-Za-z ]+),\s*([A-Za-z ]+)$/
          );

        if (match) {

          city =
            city ||
            match[1]
              .trim();

          state =
            state ||
            match[2]
              .trim();

          break;
        }
      }
    }

    console.log(
      "[OCR] Final Result",
      {
        latitude,
        longitude,
        city,
        state,
        postalCode,
      }
    );

    return {
      latitude,
      longitude,
      city,
      state,
      postalCode,
      rawText,
    };

  } catch (error) {

    console.error(
      "[OCR] Failed",
      error
    );

    return {
      city: "",
      state: "",
      postalCode: "",
      rawText: "",
    };
  }
}
