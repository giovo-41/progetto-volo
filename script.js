function valutaAltitudine(altitudine) {
  if (altitudine < 300) return "CRITICO";
  if (altitudine < 600) return "ATTENZIONE";
  return "OK";
}

function valutaVelocita(velocita) {
  if (velocita < 180) return "CRITICO";
  if (velocita < 220) return "ATTENZIONE";
  return "OK";
}

function valutaVento(vento) {
  if (vento > 70) return "CRITICO";
  if (vento > 40) return "ATTENZIONE";
  return "OK";
}

function valutaCarburante(carburante, distanza) {
  let autonomia = carburante * 2;

  if (autonomia < distanza) return "CRITICO";
  if (autonomia < distanza * 1.25) return "ATTENZIONE";
  return "OK";
}

function classeStato(stato) {
  if (stato === "OK") return "ok";
  if (stato === "ATTENZIONE") return "attenzione";
  return "critico";
}

function calcolaStatoGenerale(stati) {
  if (stati.includes("CRITICO")) return "CRITICO";
  if (stati.includes("ATTENZIONE")) return "DA MONITORARE";
  return "SICURO";
}

function analizzaVolo() {
  let altitudine = Number(document.getElementById("altitudine").value);
  let velocita = Number(document.getElementById("velocita").value);
  let vento = Number(document.getElementById("vento").value);
  let carburante = Number(document.getElementById("carburante").value);
  let distanza = Number(document.getElementById("distanza").value);

  let risultato = document.getElementById("risultato");

  if (
    altitudine <= 0 ||
    velocita <= 0 ||
    vento < 0 ||
    carburante <= 0 ||
    distanza <= 0
  ) {
    risultato.innerHTML = `
      <div class="dashboard-title">Errore</div>
      <p>Inserisci tutti i dati correttamente.</p>
    `;
    return;
  }

  let statoAltitudine = valutaAltitudine(altitudine);
  let statoVelocita = valutaVelocita(velocita);
  let statoVento = valutaVento(vento);
  let statoCarburante = valutaCarburante(carburante, distanza);

  let tempo = distanza / velocita;
  let autonomia = carburante * 2;

  let statoFinale = calcolaStatoGenerale([
    statoAltitudine,
    statoVelocita,
    statoVento,
    statoCarburante
  ]);

  risultato.innerHTML = `
    <div class="dashboard-title">Report di volo</div>

    <div class="dashboard-grid">
      <div class="dashboard-card">
        <h3>Altitudine</h3>
        <p class="${classeStato(statoAltitudine)}">${statoAltitudine}</p>
      </div>

      <div class="dashboard-card">
        <h3>Velocità</h3>
        <p class="${classeStato(statoVelocita)}">${statoVelocita}</p>
      </div>

      <div class="dashboard-card">
        <h3>Vento</h3>
        <p class="${classeStato(statoVento)}">${statoVento}</p>
      </div>

      <div class="dashboard-card">
        <h3>Carburante</h3>
        <p class="${classeStato(statoCarburante)}">${statoCarburante}</p>
      </div>
    </div>

    <div class="dashboard-final">
      Stato generale: ${statoFinale}
    </div>

    <p>Tempo stimato di arrivo: <strong>${tempo.toFixed(2)} ore</strong></p>
    <p>Autonomia stimata: <strong>${autonomia.toFixed(0)} km</strong></p>
  `;
}