import Tesseract from "tesseract.js";

export interface BrowserOcrResult {
  latitude?: number;
  longitude?: number;

  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;

  rawText?: string;
}

function validCoordinate(
  lat?: number,
  lon?: number
) {
  return (
    lat !== undefined &&
    lon !== undefined &&
    lat >= -90 &&
    lat <= 90 &&
    lon >= -180 &&
    lon <= 180
  );
}

export async function runBrowserOcr(
  imageUrl: string
): Promise<BrowserOcrResult> {

  const result =
    await Tesseract.recognize(
      imageUrl,
      "eng"
    );

  const text =
    result.data.text || "";

  let latitude:
    | number
    | undefined;

  let longitude:
    | number
    | undefined;

  const patterns = [
    /Latitude\s*[:\-]?\s*([+-]?\d+\.\d+).*?Longitude\s*[:\-]?\s*([+-]?\d+\.\d+)/is,

    /Lat\s*[:\-]?\s*([+-]?\d+\.\d+).*?Long\s*[:\-]?\s*([+-]?\d+\.\d+)/is,

    /([+-]?\d{1,2}\.\d{4,})[^\d]+([+-]?\d{1,3}\.\d{4,})/is,
  ];

  for (const pattern of patterns) {

    const match =
      text.match(pattern);

    if (!match) {
      continue;
    }

    const lat =
      Number(match[1]);

    const lon =
      Number(match[2]);

    if (
      validCoordinate(
        lat,
        lon
      )
    ) {
      latitude = lat;
      longitude = lon;
      break;
    }
  }

  const pin =
    text.match(/\b\d{6}\b/);

  const city =
    text.match(
      /\b(Pune|Mumbai|Bengaluru|Bangalore|Delhi|Hyderabad|Chennai)\b/i
    );

  const state =
    text.match(
      /(Maharashtra|Karnataka|Goa|Gujarat|Tamil Nadu|Kerala|Delhi)/i
    );

  return {
    latitude,
    longitude,

    postalCode:
      pin?.[0],

    city:
      city?.[1],

    state:
      state?.[1],

    country:
      state
        ? "India"
        : "",

    address:
      text
        .replace(
          /\n/g,
          ", "
        )
        .slice(0, 250),

    rawText: text,
  };
}
