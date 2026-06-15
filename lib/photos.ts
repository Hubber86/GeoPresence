import { getPhotos } from "./photoScanner";
import { extractExif } from "./exif";
import { reverseGeocode } from "./geocoder";

export async function getPhotoMetadata() {
  const files = getPhotos();

  const results = await Promise.all(
    files.map(async (file) => {
      const exif =
        await extractExif(file.path);

      let geo = {};

      if (
        exif.latitude &&
        exif.longitude
      ) {
        geo = await reverseGeocode(
          exif.latitude,
          exif.longitude
        );
      }

      return {
        fileName: file.name,
        ...exif,
        ...geo,
      };
    })
  );

  return results;
}
