interface CreateCurrentLocationMarkerParams {
  map: kakao.maps.Map
  lat: number
  lng: number
}

interface CurrentLocationMarker {
  remove: () => void
}

const CURRENT_LOCATION_MARKER_SIZE = 44

const CURRENT_LOCATION_MARKER_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
  <circle cx="22" cy="22" r="16" fill="#72757b" fill-opacity="0.2"/>
  <circle cx="22" cy="22" r="9" fill="#72757b" stroke="#fff" stroke-width="4"/>
</svg>
`)

export function createCurrentLocationMarker({
  map,
  lat,
  lng,
}: CreateCurrentLocationMarkerParams): CurrentLocationMarker {
  const markerImage = new window.kakao.maps.MarkerImage(
    `data:image/svg+xml;charset=UTF-8,${CURRENT_LOCATION_MARKER_SVG}`,
    new window.kakao.maps.Size(CURRENT_LOCATION_MARKER_SIZE, CURRENT_LOCATION_MARKER_SIZE),
  )

  const marker = new window.kakao.maps.Marker({
    position: new window.kakao.maps.LatLng(lat, lng),
    map,
    title: '현재 위치',
    image: markerImage,
    zIndex: 100,
  })

  return {
    remove: () => marker.setMap(null),
  }
}
