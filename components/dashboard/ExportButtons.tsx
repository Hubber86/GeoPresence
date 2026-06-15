"use client";

import {
  Download,
  FileJson,
  FileSpreadsheet,
  FileText,
} from "lucide-react";

export default function ExportButtons() {
  const downloadFile = (
    endpoint: string
  ) => {
    window.open(endpoint, "_blank");
  };

  return (
    <section
      className="
        rounded-xl
        border
        bg-white
        p-6
        shadow-sm
      "
    >
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          Export Reports
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Download attendance reports in
          multiple formats.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {/* CSV */}

        <button
          onClick={() =>
            downloadFile(
              "/api/export/csv"
            )
          }
          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            bg-green-50
            p-4
            transition
            hover:bg-green-100
          "
        >
          <FileText className="h-6 w-6 text-green-700" />

          <div className="text-left">
            <div className="font-semibold">
              CSV Export
            </div>

            <div className="text-xs text-slate-500">
              Spreadsheet Compatible
            </div>
          </div>
        </button>

        {/* Excel */}

        <button
          onClick={() =>
            downloadFile(
              "/api/export/excel"
            )
          }
          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            bg-emerald-50
            p-4
            transition
            hover:bg-emerald-100
          "
        >
          <FileSpreadsheet className="h-6 w-6 text-emerald-700" />

          <div className="text-left">
            <div className="font-semibold">
              Excel Export
            </div>

            <div className="text-xs text-slate-500">
              XLSX Format
            </div>
          </div>
        </button>

        {/* JSON */}

        <button
          onClick={() =>
            downloadFile(
              "/api/export/json"
            )
          }
          className="
            flex
            items-center
            justify-center
            gap-3
            rounded-xl
            border
            bg-blue-50
            p-4
            transition
            hover:bg-blue-100
          "
        >
          <FileJson className="h-6 w-6 text-blue-700" />

          <div className="text-left">
            <div className="font-semibold">
              JSON Export
            </div>

            <div className="text-xs text-slate-500">
              Developer Friendly
            </div>
          </div>
        </button>
      </div>

      <div
        className="
          mt-6
          flex
          items-center
          gap-2
          rounded-lg
          bg-slate-50
          p-3
          text-sm
          text-slate-600
        "
      >
        <Download className="h-4 w-4" />

        Exports are generated directly
        from the latest processed photo
        metadata and attendance records.
      </div>
    </section>
  );
}
