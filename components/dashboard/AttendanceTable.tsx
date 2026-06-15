import {
  MapPin,
  Clock,
  CalendarDays,
} from "lucide-react";

export interface AttendanceRecord {
  date: string;

  checkIn: string;
  checkOut: string;

  duration: string;

  checkInLocation: string;
  checkOutLocation: string;

  city: string;
  state: string;
  postalCode: string;
}

interface AttendanceTableProps {
  data: AttendanceRecord[];
}

export default function AttendanceTable({
  data,
}: AttendanceTableProps) {
  if (!data.length) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold">
          No Attendance Records Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Add photos to the photos folder
          and redeploy to generate reports.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-xl border bg-white shadow-sm">
      {/* Header */}

      <div className="border-b p-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <CalendarDays className="h-5 w-5" />
          Attendance Report
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Automatically generated from
          photo metadata and GPS locations.
        </p>
      </div>

      {/* Table */}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Check-In
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Check-Out
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Duration
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                City
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                State
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                PIN Code
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Check-In Location
              </th>

              <th className="px-4 py-3 text-left text-sm font-semibold">
                Check-Out Location
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((record, index) => (
              <tr
                key={`${record.date}-${index}`}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-4 text-sm font-medium">
                  {record.date}
                </td>

                <td className="px-4 py-4 text-sm">
                  {record.checkIn}
                </td>

                <td className="px-4 py-4 text-sm">
                  {record.checkOut}
                </td>

                <td className="px-4 py-4">
                  <span
                    className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-full
                      bg-green-100
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-green-700
                    "
                  >
                    <Clock className="h-3 w-3" />
                    {record.duration}
                  </span>
                </td>

                <td className="px-4 py-4 text-sm">
                  {record.city || "-"}
                </td>

                <td className="px-4 py-4 text-sm">
                  {record.state || "-"}
                </td>

                <td className="px-4 py-4 text-sm">
                  {record.postalCode || "-"}
                </td>

                <td className="max-w-xs px-4 py-4 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />

                    <span className="line-clamp-2">
                      {record.checkInLocation ||
                        "-"}
                    </span>
                  </div>
                </td>

                <td className="max-w-xs px-4 py-4 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />

                    <span className="line-clamp-2">
                      {record.checkOutLocation ||
                        "-"}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-6 py-3 text-sm text-slate-500">
        Total Records: {data.length}
      </div>
    </section>
  );
}
