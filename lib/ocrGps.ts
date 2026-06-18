import Tesseract from "tesseract.js";

export interface OcrGpsResult {
  latitude?: number;
  longitude?: number;

  city?: string;
  state?: string;
  postalCode?: string;

  rawText?: string;
}

export async function extractGpsFromImage(
  filePath: string
): Promise<OcrGpsResult> {

  try {

    console.log(
      `Starting OCR: ${filePath}`
    );

    const result =
      await Tesseract.recognize(
        filePath,
        "eng"
      );

    const text =
      result.data.text || "";

    console.log(
      "===== OCR TEXT START ====="
    );

    console.log(text);

    console.log(
      "===== OCR TEXT END ====="
    );

    let latitude: number | undefined;
    let longitude: number | undefined;

    let city = "";
    let state = "";
    let postalCode = "";

    const coordinatePatterns = [

      // Lat 18.47105 Long 73.792701
      /Lat(?:itude)?\s*[:\-]?\s*([+-]?\d+\.\d+).*?Long(?:itude)?\s*[:\-]?\s*([+-]?\d+\.\d+)/is,

      // 18.47105 73.792701
      /([+-]?\d{1,2}\.\d{4,})[^\d]+([+-]?\d{1,3}\.\d{4,})/is,

      // Lat18.47105Long73.792701
      /Lat([+-]?\d+\.\d+)Long([+-]?\d+\.\d+)/is,
    ];

    for (const pattern of coordinatePatterns) {

      const match =
        text.match(pattern);

      if (match) {

        latitude =
          Number(match[1]);

        longitude =
          Number(match[2]);

        break;
      }
    }

    // PIN Code (India)
    const pinMatch =
      text.match(/\b\d{6}\b/);

    if (pinMatch) {
      postalCode =
        pinMatch[0];
    }

    // GPS Map Camera format:
    // Pune, Maharashtra, India
    const locationMatch =
      text.match(
        /([A-Za-z ]+),\s*([A-Za-z ]+),\s*India/i
      );

    if (locationMatch) {

      city =
        locationMatch[1]
          .trim();

      state =
        locationMatch[2]
          .trim();
    }

    // Fallback city/state extraction
    if (!city || !state) {

      const lines =
        text
          .split("\n")
          .map(
            (line) => line.trim()
          )
          .filter(Boolean);

      for (const line of lines) {

        const match =
          line.match(
            /([A-Za-z ]+),\s*([A-Za-z ]+)/
          );

        if (match) {

          city =
            city ||
            match[1].trim();

          state =
            state ||
            match[2].trim();

          break;
        }
      }
    }

    console.log({
      latitude,
      longitude,
      city,
      state,
      postalCode,
    });

    return {
      latitude,
      longitude,
      city,
      state,
      postalCode,
      rawText: text,
    };

  } catch (error) {

    console.error(
      "OCR failed:",
      error
    );

    return {};
  }
}
