// /* eslint-disable prefer-const */
// /* eslint-disable prefer-destructuring */
// /* eslint-disable no-undef */
// const initMap = (setLocation) => {
//   const map = L.map('new-workplace__map')

//   const target = L.latLng('35.6892', '51.3890')

//   const myMarker = L.marker(target, {
//     title: 'MyPoint',
//     alt: 'The Big I',
//     draggable: true,
//   }).addTo(map)

//   return (x, y) => {
//     let finalCoordites = {}

//     setLocation({ x, y })

//     const target2 = L.latLng(x || '35.6892', y || '51.3890')
//     console.log('target2 : ', target2)

//     map.setView(target2, 14)

//     L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//       attribution: 'OSM',
//       maxZoom: 18,
//       id: 'mapbox/streets-v11',
//       tileSize: 512,
//       zoomOffset: -1,
//       accessToken:
//         'pk.eyJ1IjoiYWxpZ2hhbmJhcmk3NiIsImEiOiJja2RzaWg1c2kwaW12MnFueGoxcWFkZWJjIn0.d_d7c40lUEZEtX9zPi-pfg',
//     }).addTo(map)

//     myMarker.on('dragend', function () {
//       const coord = String(myMarker.getLatLng()).split(',')
//       const lat = coord[0].split('(')
//       finalCoordites.x = lat[1]
//       const lng = coord[1].split(')')
//       finalCoordites.y = lng[0]
//       setLocation(finalCoordites)
//       myMarker.bindPopup(`Moved to : ${lat[1]}, ${lng[0]}.`)
//     })

//     map.on('moveend', () => {
//       myMarker.setLatLng(map.getCenter())
//       const coord = String(myMarker.getLatLng()).split(',')
//       const lat = coord[0].split('(')
//       finalCoordites.x = lat[1]
//       const lng = coord[1].split(')')
//       finalCoordites.y = lng[0]
//       setLocation(finalCoordites)
//     })
//   }
// }

// export default initMap
