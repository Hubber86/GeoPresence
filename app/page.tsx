export const dynamic = "force-dynamic";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SummaryCards from "@/components/dashboard/SummaryCards";
// import AttendanceTable from "@/components/dashboard/AttendanceTable";
import DashboardClient from "@/app/dashboard/DashboardClient";
import PhotoViewer from "@/components/dashboard/PhotoViewer";
import ExportButtons from "@/components/dashboard/ExportButtons";

import { getAttendanceReport } from "@/lib/report";
import { getPhotoMetadata } from "@/lib/photos";

export default async function HomePage() {
  try {
    const [report, photos] = await Promise.all([
      getAttendanceReport(),
      getPhotoMetadata(),
    ]);

    console.log(
      "REPORT:",
      report.length
    );

    console.log(
      "PHOTOS:",
      photos.length
    );

    const totalPhotos = photos.length;
    const totalDays = report.length;

    const sortedDates = report
      .map((item) => new Date(item.date))
      .sort(
        (a, b) =>
          a.getTime() - b.getTime()
      );

    const earliestDate =
      sortedDates.length > 0
        ? sortedDates[0].toLocaleDateString(
            "en-IN"
          )
        : "-";

    const latestDate =
      sortedDates.length > 0
        ? sortedDates[
            sortedDates.length - 1
          ].toLocaleDateString(
            "en-IN"
          )
        : "-";

    return (
      <main className="min-h-screen bg-slate-50">
        <div className="container mx-auto max-w-7xl px-6 py-8 space-y-8">
          {/* Dashboard Header */}
          <DashboardHeader />

          {/* Summary Statistics */}
          <SummaryCards
            totalPhotos={totalPhotos}
            totalDays={totalDays}
            earliestDate={earliestDate}
            latestDate={latestDate}
          />

          {/* Export Section */}
          <ExportButtons />

          {/* Attendance Report */}
          {/* <AttendanceTable data={report} /> */}

          {/* Photo Metadata Gallery */}
          {/* <PhotoViewer photos={photos} /> */}

          <DashboardClient
            report={report}
            photos={photos}
          />
        </div>
      </main>
    );
  } catch (error) {
    console.error(
      "PAGE ERROR:",
      error
    );

    return (
      <main className="p-8">
        <h1>
          Dashboard Error
        </h1>
        <pre>
          {error instanceof Error
            ? error.message
            : String(error)}
        </pre>
      </main>
    );
  }
}
