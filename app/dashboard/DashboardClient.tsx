// "use client";

// import { useMemo, useState } from "react";

// import Filters, {
//   FilterValues,
// } from "@/components/dashboard/Filters";

// import AttendanceTable, {
//   AttendanceRecord,
// } from "@/components/dashboard/AttendanceTable";

// import PhotoViewer, {
//   PhotoMetadata,
// } from "@/components/dashboard/PhotoViewer";

// interface DashboardClientProps {
//   report: AttendanceRecord[];
//   photos: PhotoMetadata[];
// }

// const defaultFilters: FilterValues = {
//   startDate: "",
//   endDate: "",
//   state: "",
//   city: "",
//   postalCode: "",
// };

// export default function DashboardClient({
//   report,
//   photos,
// }: DashboardClientProps) {
//   const [filters, setFilters] =
//     useState<FilterValues>(
//       defaultFilters
//     );

//   const filteredReport = useMemo(() => {
//     return report.filter((record) => {
//       const recordDate =
//         new Date(record.date);

//       const startMatch =
//         !filters.startDate ||
//         recordDate >=
//           new Date(
//             filters.startDate
//           );

//       const endMatch =
//         !filters.endDate ||
//         recordDate <=
//           new Date(
//             filters.endDate
//           );

//       const stateMatch =
//         !filters.state ||
//         record.state
//           .toLowerCase()
//           .includes(
//             filters.state.toLowerCase()
//           );

//       const cityMatch =
//         !filters.city ||
//         record.city
//           .toLowerCase()
//           .includes(
//             filters.city.toLowerCase()
//           );

//       const pinMatch =
//         !filters.postalCode ||
//         record.postalCode.includes(
//           filters.postalCode
//         );

//       return (
//         startMatch &&
//         endMatch &&
//         stateMatch &&
//         cityMatch &&
//         pinMatch
//       );
//     });
//   }, [report, filters]);

//   const filteredPhotos =
//     useMemo(() => {
//       return photos.filter(
//         (photo) => {
//           const stateMatch =
//             !filters.state ||
//             photo.state
//               ?.toLowerCase()
//               .includes(
//                 filters.state.toLowerCase()
//               );

//           const cityMatch =
//             !filters.city ||
//             photo.city
//               ?.toLowerCase()
//               .includes(
//                 filters.city.toLowerCase()
//               );

//           const pinMatch =
//             !filters.postalCode ||
//             photo.postalCode?.includes(
//               filters.postalCode
//             );

//           return (
//             stateMatch &&
//             cityMatch &&
//             pinMatch
//           );
//         }
//       );
//     }, [photos, filters]);

//   return (
//     <div className="space-y-8">
//       {/* Filters */}

//       <Filters
//         values={filters}
//         onChange={setFilters}
//       />

//       {/* Attendance */}

//       <AttendanceTable
//         data={filteredReport}
//       />

//       {/* Photos */}

//       <PhotoViewer
//         photos={filteredPhotos}
//       />
//     </div>
//   );
// }

"use client";

import {
  useMemo,
  useState,
  useEffect,
} from "react";

import Filters, {
  FilterValues,
} from "@/components/dashboard/Filters";

import AttendanceTable, {
  AttendanceRecord,
} from "@/components/dashboard/AttendanceTable";

import PhotoViewer, {
  PhotoMetadata,
} from "@/components/dashboard/PhotoViewer";

interface DashboardClientProps {
  report: AttendanceRecord[];
  photos: PhotoMetadata[];
}

const defaultFilters: FilterValues = {
  startDate: "",
  endDate: "",
  state: "",
  city: "",
  postalCode: "",
};

export default function DashboardClient({
  report,
  photos,
}: DashboardClientProps) {
  const [filters, setFilters] = useState(defaultFilters);

  /*
    Merge browser OCR cache
    with server photo metadata
  */
  const [browserPhotos, setBrowserPhotos] =
    useState<PhotoMetadata[]>(photos);

  useEffect(() => {
    const cache = JSON.parse(
      localStorage.getItem("ocr-cache") || "{}"
    );

    const merged = photos.map((photo) => ({
      ...photo,
      ...(cache[photo.fileName] || {}),
    }));

    setBrowserPhotos(merged);
  }, [photos]);

  const filteredReport = useMemo(() => {
    return report.filter((record) => {
      const recordDate = new Date(record.date);

      const startMatch =
        !filters.startDate ||
        recordDate >= new Date(filters.startDate);

      const endMatch =
        !filters.endDate ||
        recordDate <= new Date(filters.endDate);

      const stateMatch =
        !filters.state ||
        record.state
          .toLowerCase()
          .includes(filters.state.toLowerCase());

      const cityMatch =
        !filters.city ||
        record.city
          .toLowerCase()
          .includes(filters.city.toLowerCase());

      const pinMatch =
        !filters.postalCode ||
        record.postalCode.includes(
          filters.postalCode
        );

      return (
        startMatch &&
        endMatch &&
        stateMatch &&
        cityMatch &&
        pinMatch
      );
    });
  }, [report, filters]);

  const filteredPhotos = useMemo(() => {
    return browserPhotos.filter((photo) => {
      const stateMatch =
        !filters.state ||
        photo.state
          ?.toLowerCase()
          .includes(filters.state.toLowerCase());

      const cityMatch =
        !filters.city ||
        photo.city
          ?.toLowerCase()
          .includes(filters.city.toLowerCase());

      const pinMatch =
        !filters.postalCode ||
        photo.postalCode?.includes(
          filters.postalCode
        );

      return (
        stateMatch &&
        cityMatch &&
        pinMatch
      );
    });
  }, [browserPhotos, filters]);

  return (
    <>
      <Filters
        values={filters}
        onChange={setFilters}
      />

      <AttendanceTable
        data={filteredReport}
      />

      <PhotoViewer
        photos={filteredPhotos}
      />
    </>
  );
}
