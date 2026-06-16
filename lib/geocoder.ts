export async function reverseGeocode(
  lat: number,
  lon: number
) {
  try {

    const baseUrl =
      process.env
        .NOMINATIM_BASE_URL ||
      "https://nominatim.openstreetmap.org";

    const url =
      `${baseUrl}/reverse` +
      `?format=jsonv2` +
      `&lat=${lat}` +
      `&lon=${lon}`;

    const response =
      await fetch(url, {
        headers: {
          "User-Agent":
            "GeoPresence/1.0",
        },
        cache: "no-store",
      });

    if (!response.ok) {
      throw new Error(
        `Geocoder failed: ${response.status}`
      );
    }

    const data =
      await response.json();

    return {
      address:
        data?.display_name ?? "",

      city:
        data?.address?.city ||
        data?.address?.town ||
        data?.address?.village ||
        "",

      district:
        data?.address?.county ||
        "",

      state:
        data?.address?.state ||
        "",

      country:
        data?.address?.country ||
        "",

      postalCode:
        data?.address?.postcode ||
        "",
    };

  } catch (error) {

    console.error(
      "Reverse geocode error:",
      error
    );

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
