import { buildAttendance }
from "./attendance";

import { getPhotoMetadata }
from "./photos";

export async function getAttendanceReport() {
  const photos =
    await getPhotoMetadata();

  return buildAttendance(
    photos
  );
}
