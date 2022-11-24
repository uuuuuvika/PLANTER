mapboxgl.accessToken = 'pk.eyJ1IjoiY2JlcnQyMDIyIiwiYSI6ImNsYXNhajhyMzA2M2Qzd3FsMWs0cnJsM2YifQ.eHEHPHcboVk6L2NUAHvCiw';
const map2 = new mapboxgl.Map({
  container: 'map2',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 12,
  center: [13.387472,52.517072] //lng, lat
});



// Add navigation
const nav2 = new mapboxgl.NavigationControl()
map2.addControl(nav2, "top-left")

// Add map with markers created while creatiung the event

const lngLat = document.querySelector('#hideco span').innerText
console.log(lngLat)

let pos = lngLat.indexOf(",")
let pos2 = lngLat.indexOf(")")

let lng = lngLat.slice(7,25)
let lat = lngLat.slice(pos+2 ,pos2)

let arr = [lng,lat]


new mapboxgl.Marker({

  color: "green",
}).setLngLat(arr)
  .addTo(map2)
