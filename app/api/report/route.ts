import { NextResponse }
from "next/server";

import { buildAttendance }
from "@/lib/attendance";

export async function GET() {

  const photos =
    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/photos`
    ).then(r => r.json());

  const report =
    buildAttendance(photos);

  return NextResponse.json(report);
}
