import Papa from "papaparse";
import * as XLSX from "xlsx";

export function createCsv(
  data: unknown[]
): string {
  return Papa.unparse(data);
}

export function createJson(
  data: unknown[]
): string {
  return JSON.stringify(
    data,
    null,
    2
  );
}

export function createExcel(
  data: unknown[]
): Uint8Array {
  const workbook =
    XLSX.utils.book_new();

  const worksheet =
    XLSX.utils.json_to_sheet(data);

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Attendance");

  return XLSX.write(workbook, {
    type: "array",
    bookType: "xlsx",
  });
}
