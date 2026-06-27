declare namespace kakao {
  namespace maps {
    class Map {
      constructor(container: HTMLElement, options: MapOptions)
      setCenter(latlng: LatLng): void
      getCenter(): LatLng
    }

    class LatLng {
      constructor(lat: number, lng: number)
      getLat(): number
      getLng(): number
    }

    class Marker {
      constructor(options: MarkerOptions)
      setMap(map: Map | null): void
      getPosition(): LatLng
    }

    interface MapOptions {
      center: LatLng
      level: number
    }

    interface MarkerOptions {
      position: LatLng
      map?: Map
      title?: string
    }

    namespace event {
      function addListener(target: Map | Marker, type: string, handler: () => void): void
      function removeListener(target: Map | Marker, type: string, handler: () => void): void
    }

    function load(callback: () => void): void
  }
}

interface Window {
  kakao: typeof kakao
}
