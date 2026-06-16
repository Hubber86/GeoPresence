export interface PhotoMetadata {
  fileName: string;

  /**
   * Unix timestamp (milliseconds)
   * Used for sorting and duration calculations
   */
  timestamp: number;

  latitude?: number;
  longitude?: number;

  dateTaken: string;
  timeTaken: string;

  address?: string;

  city?: string;
  district?: string;
  state?: string;
  country?: string;

  postalCode?: string;

  camera?: string;
}

export interface AttendanceRecord {
  date: string;

  checkIn: string;
  checkOut: string;

  duration: string;

  checkInLocation: string;
  checkOutLocation: string;

  city: string;
  state: string;

  postalCode: string;
}
