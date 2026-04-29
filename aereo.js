let plane = document.getElementById("plane");
let planePosition = -80;

function muoviAereo() {
  if (plane) {
    planePosition += 2;
    plane.style.left = planePosition + "px";

    if (planePosition > window.innerWidth) {
      planePosition = -80;
    }
  }

  requestAnimationFrame(muoviAereo);
}

muoviAereo();