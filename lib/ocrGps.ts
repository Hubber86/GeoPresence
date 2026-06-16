import Tesseract from "tesseract.js";

export async function extractGpsFromImage(
  imagePath: string
) {
  try {
    const result =
      await Tesseract.recognize(
        imagePath,
        "eng"
      );

    const text =
      result.data.text;

    const latMatch =
      text.match(
        /Lat\s*([0-9]+\.[0-9]+)/
      );

    const lonMatch =
      text.match(
        /Long\s*([0-9]+\.[0-9]+)/
      );

    return {
      latitude: latMatch
        ? Number(latMatch[1])
        : undefined,

      longitude: lonMatch
        ? Number(lonMatch[1])
        : undefined,

      rawText: text
    };
  } catch {
    return {};
  }
}
