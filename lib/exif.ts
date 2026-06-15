import * as exifr from "exifr";

export async function extractExif(
  filePath: string
) {
  const exif = await exifr.parse(filePath, {
    gps: true
  });

  return {
    latitude: exif?.latitude,
    longitude: exif?.longitude,
    date: exif?.DateTimeOriginal,
    camera:
      `${exif?.Make || ""} ${exif?.Model || ""}`
  };
}
