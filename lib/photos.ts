import { getPhotos } from "@/lib/photoScanner";
import { extractExif } from "@/lib/exif";
import { reverseGeocode } from "@/lib/geocoder";

import type { PhotoMetadata } from "@/lib/types";

export async function getPhotoMetadata(): Promise<PhotoMetadata[]> {

  const files = getPhotos();

  const results: PhotoMetadata[] = [];

  for (const file of files) {

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
      geo =
        await reverseGeocode(
          exif.latitude,
          exif.longitude
        );
    }

    results.push({
      ...exif,
      ...geo,
    });
  }

  return results;
}
