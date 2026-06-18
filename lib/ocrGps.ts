import { createWorker } from "tesseract.js";

export interface OcrGpsResult {
  latitude?: number;
  longitude?: number;

  address?: string;
  city?: string;
  state?: string;
  country?: string;
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

  /*
   * Disable OCR on Vercel
   * Prevents Function Timeout
   */
  if (process.env.VERCEL) {
    console.log(
      "[OCR] Disabled on Vercel"
    );

    return {
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      rawText: "",
    };
  }

  let worker: any = null;

  try {

    console.log(
      `[OCR] Processing ${filePath}`
    );

    worker =
      await createWorker("eng", 1, {
        langPath:
          "https://cdn.jsdelivr.net/npm/@tesseract.js-data/eng/4.0.0_best",
        cacheMethod: "none",
      });

    const {
      data: { text },
    } = await worker.recognize(
      filePath
    );

    const rawText =
      text || "";

    let latitude:
      | number
      | undefined;

    let longitude:
      | number
      | undefined;

    let city = "";
    let state = "";
    let country = "";
    let postalCode = "";
    let address = "";

    const coordinatePatterns = [
      /Latitude\s*[:\-]?\s*([+-]?\d+\.\d+).*?Longitude\s*[:\-]?\s*([+-]?\d+\.\d+)/is,
      /Lat\s*[:\-]?\s*([+-]?\d+\.\d+).*?Long\s*[:\-]?\s*([+-]?\d+\.\d+)/is,
      /Lat([+-]?\d+\.\d+)Long([+-]?\d+\.\d+)/is,
      /([+-]?\d{1,2}\.\d{4,})[^\d]+([+-]?\d{1,3}\.\d{4,})/is,
    ];

    for (const pattern of coordinatePatterns) {

      const match =
        rawText.match(pattern);

      if (!match) {
        continue;
      }

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
        break;
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

    const stateMatch =
      rawText.match(
        /(Maharashtra|Karnataka|Goa|Gujarat|Tamil Nadu|Kerala|Delhi)/i
      );

    if (stateMatch) {
      state =
        stateMatch[1];
      country =
        "India";
    }

    const cityMatch =
      rawText.match(
        /\b(Pune|Mumbai|Bengaluru|Bangalore|Delhi|Hyderabad|Chennai)\b/i
      );

    if (cityMatch) {
      city =
        cityMatch[1];
    }

    address =
      rawText
        .replace(/\n/g, ", ")
        .substring(0, 250)
        .trim();

    await worker.terminate();

    return {
      latitude,
      longitude,
      address,
      city,
      state,
      country,
      postalCode,
      rawText,
    };

  } catch (error) {

    console.error(
      "[OCR ERROR]",
      error
    );

    if (worker) {
      try {
        await worker.terminate();
      } catch {}
    }

    return {
      address: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      rawText: "",
    };
  }
}
