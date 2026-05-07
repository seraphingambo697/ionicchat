import { Geolocation } from "@capacitor/geolocation";

async function reverseGeocode(lat: number, lon: number): Promise<string> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
  const res = await fetch(url, {
    headers: { "Accept-Language": "en", "User-Agent": "ionicchat-app" },
  });
  if (!res.ok) throw new Error("Geocode fetch failed");
  const data = await res.json();
  const addr = data.address ?? {};
  const city = addr.city ?? addr.town ?? addr.village ?? addr.county ?? "";
  const country = addr.country ?? "";
  if (!city && !country) throw new Error("No address found");
  return [city, country].filter(Boolean).join(", ");
}

// Called on each message send. Requires location permission on native.
// Web falls back to browser geolocation API automatically.
export async function fetchLocation(): Promise<string | null> {
  try {
    const coords = await Geolocation.getCurrentPosition({
      timeout: 10000,
      enableHighAccuracy: false,
    });
    return await reverseGeocode(coords.coords.latitude, coords.coords.longitude);
  } catch {
    return null;
  }
}
