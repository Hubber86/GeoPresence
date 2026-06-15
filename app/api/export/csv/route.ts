import Papa from "papaparse";

export async function GET() {

  const report =
    await getAttendance();

  const csv =
    Papa.unparse(report);

  return new Response(csv, {
    headers: {
      "Content-Type":
      "text/csv",

      "Content-Disposition":
      "attachment; filename=attendance.csv"
    }
  });
}
