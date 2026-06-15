import { format } from "date-fns";

export function buildAttendance(
  photos: any[]
) {
  const grouped =
    Object.groupBy(
      photos,
      (p) => p.dateTaken
    );

  const records = [];

  for (const date in grouped) {
    const items =
      grouped[date]!.sort(
        (a, b) =>
          a.timestamp - b.timestamp
      );

    const first = items[0];
    const last =
      items[items.length - 1];

    const durationMs =
      last.timestamp -
      first.timestamp;

    const hours =
      Math.floor(
        durationMs /
          (1000 * 60 * 60)
      );

    const mins =
      Math.floor(
        (durationMs %
          (1000 * 60 * 60)) /
          (1000 * 60)
      );

    records.push({
      date,

      checkIn:
        first.timeTaken,

      checkOut:
        last.timeTaken,

      duration:
        `${hours}h ${mins}m`,

      checkInLocation:
        first.address,

      checkOutLocation:
        last.address,

      city:
        first.city,

      state:
        first.state,

      postalCode:
        first.postalCode
    });
  }

  return records;
}
