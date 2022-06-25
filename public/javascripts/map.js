var map = L.map('main_map').setView([10.975186, -63.866160], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

L.marker([10.965409, -63.821345]).addTo(map);
L.marker([10.959779, -63.818735]).addTo(map);
L.marker([10.950887, -63.821219]).addTo(map);