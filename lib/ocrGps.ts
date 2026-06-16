import Tesseract
from "tesseract.js";

export async function
extractGpsFromImage(
  filePath: string
) {

  try {

    const result =
      await Tesseract.recognize(
        filePath,
        "eng"
      );

    const text =
      result.data.text;

    console.log(text);

    let latitude;
    let longitude;

    const patterns = [

      /Lat(?:itude)?[:\s]*([+-]?\d+\.\d+).*?Lon(?:gitude)?[:\s]*([+-]?\d+\.\d+)/is,

      /([+-]?\d{1,2}\.\d{5,})[^\d]+([+-]?\d{1,3}\.\d{5,})/,

    ];

    for (
      const pattern
      of patterns
    ) {

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

    return {
      latitude,
      longitude,
      rawText: text,
    };

  } catch (error) {

    console.error(
      "OCR failed",
      error
    );

    return {};
  }
}
