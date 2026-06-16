import Tesseract from "tesseract.js";

export async function extractGpsFromImage(
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

    console.log(
      "OCR TEXT:",
      text
    );

    let latitude: number | undefined;
    let longitude: number | undefined;

    const match =
      text.match(
        /(-?\d+\.\d+)[^\d-]+(-?\d+\.\d+)/
      );

    if (match) {
      latitude =
        Number(match[1]);

      longitude =
        Number(match[2]);
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
