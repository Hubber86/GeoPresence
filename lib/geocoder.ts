export async function reverseGeocode(
  lat: number,
  lon: number
) {
  try {

    const response =
      await fetch(
        `https://nominatim.openstreetmap.org/reverse` +
        `?format=jsonv2` +
        `&lat=${lat}` +
        `&lon=${lon}`,
        {
          headers: {
            "User-Agent":
              "GeoPresence/1.0",
          },

          cache: "no-store",
        }
      );

    if (!response.ok) {
      throw new Error(
        `Reverse geocode failed: ${response.status}`
      );
    }

    const data =
      await response.json();

    return {
      address:
        data.display_name || "",

      city:
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.municipality ||
        "",

      district:
        data.address?.county ||
        data.address?.state_district ||
        "",

      state:
        data.address?.state || "",

      country:
        data.address?.country || "",

      postalCode:
        data.address?.postcode || "",
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
