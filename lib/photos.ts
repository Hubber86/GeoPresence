import { getPhotos } from "@/lib/photoScanner";
import { extractExif } from "@/lib/exif";
import { reverseGeocode } from "@/lib/geocoder";

import type { PhotoMetadata } from "@/lib/types";

export async function getPhotoMetadata(): Promise<PhotoMetadata[]> {
  const files = getPhotos();

  return Promise.all(
    files.map(async (file) => {
      const exif = await extractExif(
        file.path,
        file.name
      );

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
        ...exif,
        ...geo,
      };
    })
  );
}
