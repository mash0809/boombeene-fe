import { useEffect, useRef, useState } from 'react'

interface Props {
  lat: number
  lng: number
  onMapReady?: (map: kakao.maps.Map) => void
}

export default function KakaoMap({ lat, lng, onMapReady }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sdkLoaded, setSdkLoaded] = useState(false)

  useEffect(() => {
    if (window.kakao?.maps) {
      window.kakao.maps.load(() => setSdkLoaded(true))
      return
    }

    const existingScript = document.getElementById('kakao-map-script')
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        window.kakao.maps.load(() => setSdkLoaded(true))
      })
      return
    }

    const script = document.createElement('script')
    script.id = 'kakao-map-script'
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_MAP_APP_KEY}&autoload=false`
    script.onload = () => window.kakao.maps.load(() => setSdkLoaded(true))
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (!sdkLoaded || !containerRef.current) return

    const map = new window.kakao.maps.Map(containerRef.current, {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: 4,
    })
    onMapReady?.(map)
  }, [sdkLoaded, lat, lng, onMapReady])

  return <div ref={containerRef} className="h-full w-full" />
}
