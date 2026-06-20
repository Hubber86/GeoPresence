// /*Working Address issue*/
// import Tesseract from "tesseract.js";

// export interface BrowserOcrResult {
//   latitude?: number;
//   longitude?: number;

//   address?: string;
//   city?: string;
//   state?: string;
//   country?: string;
//   postalCode?: string;

//   rawText?: string;
// }

// function validCoordinate(
//   lat?: number,
//   lon?: number
// ) {
//   return (
//     lat !== undefined &&
//     lon !== undefined &&
//     lat >= -90 &&
//     lat <= 90 &&
//     lon >= -180 &&
//     lon <= 180
//   );
// }

// export async function runBrowserOcr(
//   imageUrl: string
// ): Promise<BrowserOcrResult> {

//   const result =
//     await Tesseract.recognize(
//       imageUrl,
//       "eng"
//     );

//   const text =
//     result.data.text || "";

//   let latitude:
//     | number
//     | undefined;

//   let longitude:
//     | number
//     | undefined;

//   const patterns = [
//     /Latitude\s*[:\-]?\s*([+-]?\d+\.\d+).*?Longitude\s*[:\-]?\s*([+-]?\d+\.\d+)/is,

//     /Lat\s*[:\-]?\s*([+-]?\d+\.\d+).*?Long\s*[:\-]?\s*([+-]?\d+\.\d+)/is,

//     /([+-]?\d{1,2}\.\d{4,})[^\d]+([+-]?\d{1,3}\.\d{4,})/is,
//   ];

//   for (const pattern of patterns) {

//     const match =
//       text.match(pattern);

//     if (!match) {
//       continue;
//     }

//     const lat =
//       Number(match[1]);

//     const lon =
//       Number(match[2]);

//     if (
//       validCoordinate(
//         lat,
//         lon
//       )
//     ) {
//       latitude = lat;
//       longitude = lon;
//       break;
//     }
//   }

//   const pin =
//     text.match(/\b\d{6}\b/);

//   const city =
//     text.match(
//       /\b(Pune|Mumbai|Bengaluru|Bangalore|Delhi|Hyderabad|Chennai)\b/i
//     );

//   const state =
//     text.match(
//       /(Maharashtra|Karnataka|Goa|Gujarat|Tamil Nadu|Kerala|Delhi)/i
//     );

//   return {
//     latitude,
//     longitude,

//     postalCode:
//       pin?.[0],

//     city:
//       city?.[1],

//     state:
//       state?.[1],

//     country:
//       state
//         ? "India"
//         : "",

//     address:
//       text
//         .replace(
//           /\n/g,
//           ", "
//         )
//         .slice(0, 250),

//     rawText: text,
//   };
// }

/*Working address improvement*/
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

  const rawText =
    result.data.text || "";

  let latitude:
    | number
    | undefined;

  let longitude:
    | number
    | undefined;

  /*
   * Extract GPS Coordinates
   */
  const coordinatePatterns = [

    /Latitude\s*[:\-]?\s*([+-]?\d+\.\d+).*?Longitude\s*[:\-]?\s*([+-]?\d+\.\d+)/is,

    /Lat\s*[:\-]?\s*([+-]?\d+\.\d+).*?Long\s*[:\-]?\s*([+-]?\d+\.\d+)/is,

    /Lat\s*([+-]?\d+\.\d+).*?Long\s*([+-]?\d+\.\d+)/is,

    /([+-]?\d{1,2}\.\d{4,})[^\d]+([+-]?\d{1,3}\.\d{4,})/is,
  ];

  for (
    const pattern
    of coordinatePatterns
  ) {

    const match =
      rawText.match(
        pattern
      );

    if (!match) {
      continue;
    }

    const lat =
      Number(
        match[1]
      );

    const lon =
      Number(
        match[2]
      );

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

  /*
   * Postal Code
   */
  const pin =
    rawText.match(
      /\b\d{6}\b/
    );

  /*
   * State
   */
  const state =
    rawText.match(
      /(Maharashtra|Karnataka|Goa|Gujarat|Tamil Nadu|Kerala|Delhi)/i
    );

  /*
   * City
   */
  const city =
    rawText.match(
      /\b(Pune|Mumbai|Bengaluru|Bangalore|Delhi|Hyderabad|Chennai)\b/i
    );

  /*
   * Address Extraction
   *
   * Prefer industrial estate /
   * locality text instead of
   * OCR garbage at image top.
   */
  let address = "";

  const addressPatterns = [

    /((?:Pandhari).*?411023.*?India)/is,

    /((?:Dangat).*?411023.*?India)/is,

    /((?:Industrial).*?411023.*?India)/is,

    /((?:Shivane).*?411023.*?India)/is,

    /((?:Pune).*?411023.*?India)/is,
  ];

  for (
    const pattern
    of addressPatterns
  ) {

    const match =
      rawText.match(
        pattern
      );

    if (!match) {
      continue;
    }

    address =
      match[1]
        .replace(
          /\n/g,
          " "
        )
        .replace(
          /\s+/g,
          " "
        )
        .trim();

    break;
  }

  /*
   * Fallback:
   * Extract text before Lat
   */
  if (!address) {

    const fallback =
      rawText.match(
        /(.*?)(?=Lat\s*[+-]?\d+\.\d+)/is
      );

    if (
      fallback?.[1]
    ) {

      address =
        fallback[1]
          .replace(
            /\n/g,
            " "
          )
          .replace(
            /\s+/g,
            " "
          )
          .trim();
    }
  }

  /*
   * Cleanup OCR Noise
   */
  address = address

    .replace(
      /GPS\s*Map\s*Camera/gi,
      ""
    )

    .replace(
      /GPs\s*Map\s*camera/gi,
      ""
    )

    .replace(
      /Google!?/gi,
      ""
    )

    .replace(
      /GMT\s*\+\d+:\d+/gi,
      ""
    )

    .replace(
      /=+/g,
      ""
    )

    .replace(
      /[|\\"]/g,
      " "
    )

    .replace(
      /\s+/g,
      " "
    )

    .trim();

  /*
   * Final fallback
   */
  if (
    !address ||
    address.length < 20
  ) {

    address = [
      city?.[1],
      state?.[1],
      pin?.[0],
      "India",
    ]
      .filter(Boolean)
      .join(", ");
  }

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

    address,

    rawText,
  };
}

