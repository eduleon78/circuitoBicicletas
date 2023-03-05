var map = L.map('main_map').setView([10.975186, -63.866160], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

/* L.marker([10.964416, -63.820184]).addTo(map);
L.marker([10.960645, -63.818875]).addTo(map);
L.marker([10.950752, -63.820573]).addTo(map); */

$.ajax({
  dataType: "json",
  url: "bicicletas",
  success: function(result){
    console.log(result);
    result.bicicletas.forEach(function(bici){
      L.marker(bici.ubicacion, {title: bici.id}).addTo(map);
    });
  },
});