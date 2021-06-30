/*eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW5pc2hzaW5oYSIsImEiOiJja3FjdW83YmUwcmpxMnZwOWJ1bDFkMGMyIn0.cJ4llNaR7kMvKrfRwfEIpA';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/anishsinha/ckqcy06q10zmc17s1rxf8e222',
    zoom: 1,
    scrollZoom: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const el = document.createElement('div');
    el.className = 'marker';
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds);
};
