export async function reverseGeocode(
  lat: number,
  lon: number
) {
  try {
    const url =
      `https://nominatim.openstreetmap.org/reverse` +
      `?format=jsonv2` +
      `&lat=${lat}` +
      `&lon=${lon}`;

    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "GeoPresence/1.0",
      },
    });

    if (!res.ok) {
      throw new Error(
        `Geocoder error ${res.status}`
      );
    }

    const data = await res.json();

    return {
      address:
        data.display_name ?? "",

      city:
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        "",

      district:
        data.address?.county || "",

      state:
        data.address?.state || "",

      country:
        data.address?.country || "",

      postalCode:
        data.address?.postcode || "",
    };
  } catch (error) {
    console.error(error);

    return {
      address: "",
      city: "",
      district: "",
      state: "",
      country: "",
      postalCode: "",
    };
  }
}
