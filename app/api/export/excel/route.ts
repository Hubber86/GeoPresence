import XLSX from "xlsx";

export async function GET() {

  const report =
    await getAttendance();

  const wb =
    XLSX.utils.book_new();

  const ws =
    XLSX.utils.json_to_sheet(
      report
    );

  XLSX.utils.book_append_sheet(
    wb,
    ws,
    "Attendance"
  );

  const buffer =
    XLSX.write(wb, {
      type: "buffer",
      bookType: "xlsx"
    });

  return new Response(buffer, {
    headers: {
      "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

      "Content-Disposition":
      "attachment; filename=attendance.xlsx"
    }
  });
}
