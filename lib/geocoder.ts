export async function reverseGeocode(
  lat: number,
  lon: number
) {
  const url =
    `https://nominatim.openstreetmap.org/reverse` +
    `?format=jsonv2` +
    `&lat=${lat}` +
    `&lon=${lon}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "PhotoAttendanceApp"
    }
  });

  const data = await res.json();

  return {
    address: data.display_name,

    city:
      data.address.city ||
      data.address.town ||
      data.address.village,

    district:
      data.address.county,

    state:
      data.address.state,

    country:
      data.address.country,

    postalCode:
      data.address.postcode
  };
}
