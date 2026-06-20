import Image from "next/image";
import {
  Camera,
  Calendar,
  Clock,
  MapPin,
  Navigation,
} from "lucide-react";

// export interface PhotoMetadata {
//   fileName: string;

//   latitude?: number;
//   longitude?: number;

//   dateTaken?: string;
//   timeTaken?: string;

//   address?: string;
//   city?: string;
//   district?: string;
//   state?: string;
//   country?: string;
//   postalCode?: string;

//   camera?: string;
// }

import type {
  PhotoMetadata,
} from "@/lib/types";

interface PhotoViewerProps {
  photos: PhotoMetadata[];
}

export default function PhotoViewer({
  photos,
}: PhotoViewerProps) {
  if (!photos.length) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center shadow-sm">
        <h3 className="text-lg font-semibold">
          No Photos Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Add photos to the photos folder
          and redeploy the application.
        </p>
      </div>
    );
  }

  return (
    <section className="rounded-xl border bg-white shadow-sm">
      {/* Header */}

      <div className="border-b p-6">
        <h2 className="text-xl font-semibold">
          Photo Metadata Explorer
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Browse processed photos,
          EXIF metadata and GPS details.
        </p>
      </div>

      {/* Grid */}

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
        {photos.map((photo) => {
          const mapUrl =
            photo.latitude &&
            photo.longitude
              ? `https://www.openstreetmap.org/?mlat=${photo.latitude}&mlon=${photo.longitude}`
              : null;

          return (
            <div
              key={photo.fileName}
              className="
                overflow-hidden
                rounded-xl
                border
                bg-white
                transition
                hover:shadow-lg
              "
            >
              {/* Image */}

              <div className="relative h-64 w-full bg-slate-100">
                <Image
                  src={`/photos/${photo.fileName}`}
                  alt={photo.fileName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Metadata */}

              <div className="space-y-3 p-4">
                <div>
                  <h3 className="truncate font-semibold">
                    {photo.fileName}
                  </h3>
                </div>

                {/* Date */}

                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-blue-600" />

                  <span>
                    {photo.dateTaken || "-"}
                  </span>
                </div>

                {/* Time */}

                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-green-600" />

                  <span>
                    {photo.timeTaken || "-"}
                  </span>
                </div>

                {/* Camera */}

                <div className="flex items-center gap-2 text-sm">
                  <Camera className="h-4 w-4 text-purple-600" />

                  <span>
                    {photo.camera || "Unknown"}
                  </span>
                </div>

                {/* GPS */}

                <div className="rounded-lg bg-slate-50 p-3 text-xs">
                  <div>
                    <strong>Latitude:</strong>{" "}
                    {photo.latitude ?? "-"}
                  </div>

                  <div>
                    <strong>Longitude:</strong>{" "}
                    {photo.longitude ?? "-"}
                  </div>
                </div>

                {/* Location */}

                <div className="flex gap-2 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />

                  <div>
                    <div>
                      {photo.address || "-"}
                    </div>

                    <div className="mt-1 text-xs text-slate-500">
                      {[
                        photo.city,
                        photo.state,
                        photo.postalCode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </div>
                  </div>
                </div>

                {/* Map Link */}

                {mapUrl && (
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex
                      items-center
                      gap-2
                      rounded-lg
                      bg-blue-600
                      px-3
                      py-2
                      text-sm
                      font-medium
                      text-white
                      transition
                      hover:bg-blue-700
                    "
                  >
                    <Navigation className="h-4 w-4" />

                    Open in OpenStreetMap
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}

      <div className="border-t bg-slate-50 px-6 py-3 text-sm text-slate-500">
        Total Photos: {photos.length}
      </div>
    </section>
  );
}
