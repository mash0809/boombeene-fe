interface MapCenterLocation {
  lat: number
  lng: number
}

export function getMapCenterLocation(map: kakao.maps.Map): MapCenterLocation {
  const center = map.getCenter()

  return {
    lat: center.getLat(),
    lng: center.getLng(),
  }
}
