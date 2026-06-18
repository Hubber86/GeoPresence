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
      `OCR Processing: ${filePath}`
    );

    const {
      data: { text }
    } = await Tesseract.recognize(
      filePath,
      "eng",
      {
        logger: (m) => {
          if (m.status === "recognizing text") {
            console.log(
              `OCR ${Math.round(
                m.progress * 100
              )}%`
            );
          }
        }
      }
    );

    console.log(
      "===== OCR OUTPUT START ====="
    );

    console.log(text);

    console.log(
      "===== OCR OUTPUT END ====="
    );

    let latitude: number | undefined;
    let longitude: number | undefined;

    let city = "";
    let state = "";
    let postalCode = "";

    const coordinatePatterns = [

      // Latitude:18.47105 Longitude:73.792701
      /Latitude\s*[:\-]?\s*([+-]?\d+\.\d+).*?Longitude\s*[:\-]?\s*([+-]?\d+\.\d+)/is,

      // Lat 18.47105 Long 73.792701
      /Lat\s*[:\-]?\s*([+-]?\d+\.\d+).*?Long\s*[:\-]?\s*([+-]?\d+\.\d+)/is,

      // Lat18.47105Long73.792701
      /Lat([+-]?\d+\.\d+)Long([+-]?\d+\.\d+)/is,

      // Standalone coordinates
      /([+-]?\d{1,2}\.\d{4,})[^\d]+([+-]?\d{1,3}\.\d{4,})/is,
    ];

    for (const pattern of coordinatePatterns) {

      const match =
        text.match(pattern);

      if (match) {

        latitude =
          Number(match[1]);

        longitude =
          Number(match[2]);

        console.log(
          `GPS Found: ${latitude}, ${longitude}`
        );

        break;
      }
    }

    const pinMatch =
      text.match(/\b\d{6}\b/);

    if (pinMatch) {
      postalCode =
        pinMatch[0];
    }

    const indiaLocationMatch =
      text.match(
        /([A-Za-z ]+),\s*([A-Za-z ]+),\s*India/i
      );

    if (indiaLocationMatch) {

      city =
        indiaLocationMatch[1]
          .trim();

      state =
        indiaLocationMatch[2]
          .trim();
    }

    if (!city || !state) {

      const lines =
        text
          .split("\n")
          .map(
            (line) =>
              line.trim()
          )
          .filter(Boolean);

      for (const line of lines) {

        const match =
          line.match(
            /^([A-Za-z ]+),\s*([A-Za-z ]+)$/
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
      "OCR Extraction Failed:",
      error
    );

    return {
      city: "",
      state: "",
      postalCode: "",
    };
  }
}
