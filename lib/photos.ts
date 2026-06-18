import { getPhotos } from "@/lib/photoScanner";
import { extractExif } from "@/lib/exif";
import { reverseGeocode } from "@/lib/geocoder";

import type { PhotoMetadata } from "@/lib/types";

export async function getPhotoMetadata(): Promise<PhotoMetadata[]> {

  const files = getPhotos();

  const results = await Promise.all(

    files.map(async (file) => {

      const exif =
        await extractExif(
          file.path,
          file.name
        );

      let geo = {};

if (
  exif.latitude != null &&
  exif.longitude != null &&
  !exif.city &&
  !exif.state
) {
  geo = await reverseGeocode(
    exif.latitude,
    exif.longitude
  );
}

      return {
        ...exif,
        ...geo,
      };
    })
  );

  return results;
}
