# 🌍 GeoPresence

<div align="center">

### 📸 Transform Photos into Intelligent Attendance Reports

A modern, database-free attendance analytics platform that automatically extracts GPS coordinates and timestamps from photos, resolves locations using OpenStreetMap, and generates professional Check-In / Check-Out reports.

![Next.js](https://img.shields.io/badge/Next.js-15+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6)
![Vercel](https://img.shields.io/badge/Vercel-Free_Tier-black)
![License](https://img.shields.io/badge/License-MIT-green)
![Database](https://img.shields.io/badge/Database-None-success)
![OpenStreetMap](https://img.shields.io/badge/OpenStreetMap-Nominatim-brightgreen)

</div>

---

## ✨ Overview

GeoPresence automatically processes photos stored in your repository and converts them into structured attendance records.

Using embedded EXIF metadata, the system extracts:

* 📍 GPS Coordinates
* 🕒 Date & Time Captured
* 📷 Camera / Device Information
* 🏠 Human-Readable Addresses

The application then generates attendance-style reports including:

* ✅ Check-In Time
* ✅ Check-Out Time
* ✅ Duration Worked
* ✅ Location Details
* ✅ City, State & PIN Code
* ✅ Exportable Reports

No database. No paid APIs. No recurring costs.

---

## 🚀 Key Features

### 📸 Photo Intelligence

* Automatic photo discovery
* EXIF metadata extraction
* GPS coordinate detection
* Timestamp extraction
* Camera/device information extraction

### 📍 Location Resolution

* OpenStreetMap Nominatim integration
* Full address lookup
* Area / Locality detection
* City identification
* State identification
* Country detection
* PIN Code extraction

### 🕒 Attendance Analytics

* Daily attendance generation
* Automatic Check-In detection
* Automatic Check-Out detection
* Work duration calculation
* Multiple location tracking
* Visit history generation

### 📊 Dashboard

* Summary statistics
* Attendance reports
* Photo gallery
* Metadata explorer
* Location insights
* Responsive design

### 📤 Export Options

* CSV Export
* Excel (XLSX) Export
* JSON Export

### ☁️ Deployment Ready

* Vercel Free Tier compatible
* Serverless architecture
* Zero database setup
* Zero paid services
* Zero API keys

---

## 🏗️ System Architecture

```text
Photos
   │
   ▼
EXIF Extraction
   │
   ▼
GPS Coordinates
   │
   ▼
OpenStreetMap
Reverse Geocoding
   │
   ▼
Attendance Engine
   │
   ▼
Dashboard & Reports
   │
   ├── CSV
   ├── XLSX
   └── JSON
```

---

## 📂 Project Structure

```text
GeoPresence/
│
├── app/
│   ├── api/
│   ├── page.tsx
│   └── layout.tsx
│
├── components/
│   └── dashboard/
│
├── lib/
│   ├── exif.ts
│   ├── geocoder.ts
│   ├── attendance.ts
│   ├── photos.ts
│   └── report.ts
│
├── photos/
│   ├── image1.jpg
│   ├── image2.jpg
│   └── image3.jpg
│
├── public/
├── README.md
└── LICENSE
```

---

## 📋 Attendance Logic

For every calendar day:

| Logic          | Result    |
| -------------- | --------- |
| Earliest Photo | Check-In  |
| Latest Photo   | Check-Out |
| Difference     | Duration  |

Example:

```text
Date         : 15-Jun-2026
Check-In     : 09:04 AM
Check-Out    : 06:31 PM
Duration     : 09h 27m
```

If multiple locations are visited:

```text
First Location  → Check-In Location
Last Location   → Check-Out Location
```

---

## 📊 Dashboard Features

### 📈 Summary Cards

* Total Photos Processed
* Total Attendance Days
* Earliest Date
* Latest Date

### 📅 Attendance Table

| Date | Check-In | Check-Out | Duration |
| ---- | -------- | --------- | -------- |

### 🖼️ Photo Viewer

* Thumbnail Preview
* EXIF Metadata
* GPS Coordinates
* Address Information
* OpenStreetMap Link

### 🔍 Filters

* Date Range
* State
* City
* PIN Code

---

## 📸 Screenshots

### Dashboard

```text
[ Add Screenshot Here ]
```

### Attendance Table

```text
[ Add Screenshot Here ]
```

### Photo Viewer

```text
[ Add Screenshot Here ]
```

---

## ⚡ Quick Start

### Clone Repository

```bash
git clone https://github.com/your-username/GeoPresence.git

cd GeoPresence
```

### Install Dependencies

```bash
npm install
```

### Add Photos

Place images inside:

```text
photos/
```

Example:

```text
photos/
├── IMG_001.jpg
├── IMG_002.jpg
└── IMG_003.jpg
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## ☁️ Deploy on Vercel

### Step 1

Push project to GitHub.

### Step 2

Import repository into Vercel.

### Step 3

Deploy.

That's it.

No database setup required.

No environment variables required.

No API keys required.

---

## 🔒 Privacy & Security

GeoPresence is designed with simplicity and privacy in mind.

✅ No Database

✅ No User Tracking

✅ No Analytics

✅ No Paid Services

✅ No Third-Party Storage

Only location resolution requests are sent to OpenStreetMap Nominatim.

---

## 🛠️ Technology Stack

### Frontend

* Next.js 15+
* React
* TypeScript
* Tailwind CSS
* shadcn/ui

### Backend

* Next.js Route Handlers
* Server Components
* Server Actions

### Libraries

* exifr
* xlsx
* papaparse
* date-fns

### Geocoding

* OpenStreetMap Nominatim

---

## 🎯 Ideal Use Cases

* Field Staff Attendance
* Site Engineers
* Sales Representatives
* Survey Teams
* Inspection Teams
* Construction Projects
* Logistics Operations
* Remote Workforce Verification

---

## 📄 License

📜 Licensed under the [MIT License](LICENSE).

---

<div align="center">

### ⭐ If you find GeoPresence useful, consider giving the repository a star.

Built with ❤️ using Next.js, TypeScript, OpenStreetMap and Vercel.

</div>
