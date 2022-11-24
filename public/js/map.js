  mapboxgl.accessToken = 'pk.eyJ1IjoiY2JlcnQyMDIyIiwiYSI6ImNsYXNhajhyMzA2M2Qzd3FsMWs0cnJsM2YifQ.eHEHPHcboVk6L2NUAHvCiw';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 12,
    center: [13.387472,52.517072] //lng, lat
  });

  // Get current position 
  // navigator.geolocation.getCurrentPosition()

  // Add navigation
  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav, "top-left")

//  Add marker on click on map
function addMarker(event) {
	new mapboxgl.Marker({

		color: "green",
	}).setLngLat(event.lngLat)
		.addTo(map)

    //Pass lng & lat to form in hidden field
    document.getElementById('coordinates').value = event.lngLat
}

map.on("click", addMarker)


// 1. 
// let coordinates = document.getElementById(id)

// console.log(coordinates)
// new mapboxgl.Marker({

//   color: "green",
// }).setLngLat(coordinates)
//   .addTo(map)






