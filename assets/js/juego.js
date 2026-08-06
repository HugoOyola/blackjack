/**
 * 2C - Two de Clubs
 * 2D - Two de Diamonds
 * 2H - Two de Heart
 * 2S - Two de Spades
 * **/

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
  puntosComputadora = 0;

// Referencia del HTML
const btnNuevo = document.querySelector('#btnNuevoJuego');
const btnPedir = document.querySelector('#btnPedirCarta');
const btnDetener = document.querySelector('#btnDetener');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computador-cartas');

const puntosHTML = document.querySelectorAll('small');

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  // console.log(deck);
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
}

crearDeck();

// Funcion para pedir una carta:
const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en el deck';
  }

  const carta = deck.pop();
  return carta;
}

// pedirCarta();
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
}

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    puntosComputadora += valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`; //3H, JD
    imgCarta.classList.add('carta');
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }

  } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

  setTimeout(() => {
    if (puntosComputadora === puntosJugador) {
      alert('Esto es un empate');
    } else if (puntosJugador > puntosComputadora && puntosJugador <= 21 || puntosComputadora > 21) {
      alert('Ganaste!!!');
    } else if (puntosJugador < puntosComputadora && puntosComputadora <= 21 || puntosJugador > 21) {
      alert('Perdiste!!!');
    }
  }, 100);
}

const valor = valorCarta(pedirCarta());

// Eventos:
// btnPedir
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta();
  console.log(carta);
  puntosJugador += valorCarta(carta);
  console.log({ puntosJugador });

  puntosHTML[0].innerText = puntosJugador;

  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`; //3H, JD
  imgCarta.classList.add('carta');
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn('Lo siento mucho, perdiste');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn('21, genial!');
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
})

// btnDetener
btnDetener.addEventListener('click', () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
})

// btnNuevo
btnNuevo.addEventListener('click', () => {
  console.clear();
  deck = [];
  deck = crearDeck();

  // Resetear botones
  btnPedir.disabled = false;
  btnDetener.disabled = false;

  // Resetear puntos
  puntosJugador = 0;
  puntosComputadora = 0;

  // Actualizar HTML - Puntos
  puntosHTML[0].innerText = 0;
  puntosHTML[1].innerText = 0;

  // Borrar cartas
  divCartasComputadora.innerHTML = '';
  divCartasJugador.innerHTML = '';
})