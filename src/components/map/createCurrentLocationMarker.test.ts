import assert from 'node:assert/strict'
import test from 'node:test'
import { createCurrentLocationMarker } from './createCurrentLocationMarker.ts'

test('creates a current location marker and removes it from the map on cleanup', () => {
  const calls: string[] = []
  const map = {} as kakao.maps.Map

  const previousKakao = globalThis.window?.kakao
  globalThis.window = {
    kakao: {
      maps: {
        LatLng: class {
          lat: number
          lng: number

          constructor(lat: number, lng: number) {
            this.lat = lat
            this.lng = lng
          }
        },
        Marker: class {
          constructor(options: kakao.maps.MarkerOptions) {
            calls.push(`marker:${options.title}`)
            calls.push(options.image ? 'image:custom' : 'image:none')
            calls.push(`zIndex:${options.zIndex}`)
          }

          setMap(nextMap: kakao.maps.Map | null) {
            calls.push(nextMap === null ? 'setMap:null' : 'setMap:map')
          }

          getPosition() {
            throw new Error('not used')
          }
        },
        MarkerImage: class {
          constructor(
            _src: string,
            _size: kakao.maps.Size,
          ) {}
        },
        Size: class {
          constructor(
            width: number,
            height: number,
          ) {
            calls.push(`size:${width}x${height}`)
          }
        },
      },
    },
  } as Window & typeof globalThis

  const marker = createCurrentLocationMarker({ map, lat: 37.5, lng: 127.1 })
  marker.remove()

  assert.deepEqual(calls, [
    'size:44x44',
    'marker:현재 위치',
    'image:custom',
    'zIndex:100',
    'setMap:null',
  ])

  if (previousKakao) {
    globalThis.window.kakao = previousKakao
  }
})
