import { differenceInMinutes } from "date-fns";

import {
  AttendanceRecord,
  PhotoMetadata,
} from "@/lib/types";

export function buildAttendance(
  photos: PhotoMetadata[]
): AttendanceRecord[] {
  const grouped = photos.reduce(
    (
      acc,
      photo
    ) => {
      const key =
        photo.dateTaken ??
        "Unknown";

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(photo);

      return acc;
    },
    {} as Record<
      string,
      PhotoMetadata[]
    >
  );

  const records: AttendanceRecord[] =
    [];

  for (const date in grouped) {
    const items =
      grouped[date].sort(
        (a, b) =>
          (a.timestamp ?? 0) -
          (b.timestamp ?? 0)
      );

    if (!items.length) {
      continue;
    }

    const first = items[0];

    const last =
      items[
        items.length - 1
      ];

    const durationMinutes =
      differenceInMinutes(
        new Date(
          last.timestamp ?? 0
        ),
        new Date(
          first.timestamp ?? 0
        )
      );

    const hours =
      Math.floor(
        durationMinutes / 60
      );

    const minutes =
      durationMinutes % 60;

    records.push({
      date,

      checkIn:
        first.timeTaken ??
        "-",

      checkOut:
        last.timeTaken ??
        "-",

      duration:
        `${hours}h ${minutes}m`,

      checkInLocation:
        first.address ??
        "-",

      checkOutLocation:
        last.address ??
        "-",

      city:
        first.city ?? "-",

      state:
        first.state ?? "-",

      postalCode:
        first.postalCode ??
        "-",
    });
  }

  return records.sort(
    (a, b) =>
      new Date(a.date).getTime() -
      new Date(b.date).getTime()
  );
}
