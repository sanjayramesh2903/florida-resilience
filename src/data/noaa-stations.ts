// NOAA CO-OPS water level stations in Florida (real station IDs and coordinates)
// https://tidesandcurrents.noaa.gov/map/index.html?region=Florida

export interface FloridaStation {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

export const FLORIDA_NOAA_STATIONS: FloridaStation[] = [
  { id: "8728690", name: "Mayport (Jacksonville)", lat: 30.3972, lng: -81.4297 },
  { id: "8721604", name: "Trident Pier (Port Canaveral)", lat: 28.4158, lng: -80.5931 },
  { id: "8722670", name: "Lake Worth Pier", lat: 26.612, lng: -80.034 },
  { id: "8723214", name: "Virginia Key (Miami)", lat: 25.7314, lng: -80.1618 },
  { id: "8724580", name: "Key West", lat: 24.5752, lng: -81.8078 },
  { id: "8725110", name: "Naples", lat: 26.1317, lng: -81.8075 },
  { id: "8723170", name: "Fort Myers", lat: 26.6473, lng: -81.8722 },
  { id: "8726520", name: "Old Port Tampa", lat: 27.8575, lng: -82.5531 },
  { id: "8726607", name: "St. Petersburg", lat: 27.7606, lng: -82.6267 },
  { id: "8726724", name: "Clearwater Beach", lat: 27.9783, lng: -82.8317 },
  { id: "8727130", name: "Apalachicola", lat: 29.7253, lng: -84.9814 },
  { id: "8729840", name: "Panama City Beach", lat: 30.2133, lng: -85.8817 },
];

// NOAA projects ~1 ft (0.305 m) sea level rise by 2050 for U.S. coastline
export const SEA_LEVEL_RISE_2050_FT = 1;
