const API_URL = 'https://api.aviationstack.com/v1/flights';
const ACCESS_TOKEN = 'e44cef04740fa980ea9f968d1b441a55';

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("flughafen").addEventListener("change", function () {
    getFlights();
  });
});

function getFlights(flughafen) {
  var flughafen = document.getElementById("flughafen").value;
  document.getElementById("ergebnisse").innerHTML = renderLoading();
  fetch(`${API_URL}?access_key=${ACCESS_TOKEN}&dep_iata=${flughafen}&flight_status=active`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.getElementById("ergebnisse").innerHTML = "";
      for (let i = 0; i < data.data.length; i++) {
        document.getElementById("ergebnisse").innerHTML += renderFlightInfo(data.data[i]);
      }
    });
}

function renderLoading() {
  return `
    <div class="lds-dual-ring"></div>
  `;
}

function renderFlightInfo(flight) {
  flight_data = `
    <div class="flight-data">
      <h3>${flight.flight.iata ? flight.flight.iata : "Unbekannt"} - ${flight.airline.name}</h3>
      <div>
        <h4>Flugdaten</h4>
        <p>Ziel: ${flight.arrival.airport ? flight.arrival.airport : "Unbekannt"} (${flight.arrival.iata})</p>
        <p>Abflugzeit: ${new Date(flight.departure.actual).toLocaleString()}</p>
        <p>Ankunftszeit (geschätzt): ${new Date(flight.arrival.estimated).toLocaleString()}</p>
      </div>
  `;

  if (flight.aircraft) {
    flight_data += `
      <div>
        <h4>Flugzeug</h4>
        <p>Typ: ${flight.aircraft.iata}</p>
        <p>Registrierung: ${flight.aircraft.registration}</p>
      </div>
    `;
  }

  flight_data += `
    </div>
  `;
  return flight_data;
}