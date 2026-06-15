import { Camera, MapPinned, CalendarCheck } from "lucide-react";

export default function DashboardHeader() {
  const appName =
    process.env.NEXT_PUBLIC_APP_NAME ??
    "GeoPresence";

  const version =
    process.env.NEXT_PUBLIC_APP_VERSION ??
    "1.0.0";

  return (
    <header
      className="
        rounded-2xl
        border
        bg-gradient-to-r
        from-blue-600
        to-indigo-700
        p-8
        text-white
        shadow-lg
      "
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <MapPinned className="h-10 w-10" />

            <div>
              <h1 className="text-4xl font-bold">
                {appName}
              </h1>

              <p className="mt-1 text-blue-100">
                Photo-Based Attendance &
                Location Intelligence Platform
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <span
              className="
                rounded-full
                bg-white/20
                px-3
                py-1
                text-sm
              "
            >
              Version {version}
            </span>

            <span
              className="
                rounded-full
                bg-white/20
                px-3
                py-1
                text-sm
              "
            >
              Database-Free
            </span>

            <span
              className="
                rounded-full
                bg-white/20
                px-3
                py-1
                text-sm
              "
            >
              Vercel Ready
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div
            className="
              rounded-xl
              bg-white/10
              p-4
              text-center
            "
          >
            <Camera className="mx-auto h-6 w-6" />

            <p className="mt-2 text-xs">
              EXIF Metadata
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-white/10
              p-4
              text-center
            "
          >
            <MapPinned className="mx-auto h-6 w-6" />

            <p className="mt-2 text-xs">
              GPS Tracking
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-white/10
              p-4
              text-center
            "
          >
            <CalendarCheck className="mx-auto h-6 w-6" />

            <p className="mt-2 text-xs">
              Attendance
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
