  mapboxgl.accessToken = 'pk.eyJ1IjoiY2JlcnQyMDIyIiwiYSI6ImNsYXNhajhyMzA2M2Qzd3FsMWs0cnJsM2YifQ.eHEHPHcboVk6L2NUAHvCiw';
 const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 12,
    center: [13.387472,52.517072] //lng, lat
  });

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






