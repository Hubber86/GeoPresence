import { format } from "date-fns";

export function formatDate(
  date: Date | string
): string {
  return format(
    new Date(date),
    "yyyy-MM-dd"
  );
}

export function formatTime(
  date: Date | string
): string {
  return format(
    new Date(date),
    "HH:mm:ss"
  );
}

export function formatDuration(
  start: Date,
  end: Date
): string {
  const ms =
    end.getTime() - start.getTime();

  const hours = Math.floor(
    ms / (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (ms % (1000 * 60 * 60)) /
      (1000 * 60)
  );

  return `${hours}h ${minutes}m`;
}

export function unique<T>(
  values: T[]
): T[] {
  return [...new Set(values)];
}
