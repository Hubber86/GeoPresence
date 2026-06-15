import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Photo Attendance Dashboard",
  description:
    "Attendance reports generated from photo EXIF GPS and timestamp metadata",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
