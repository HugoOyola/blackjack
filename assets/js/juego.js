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
const btnPedir = document.querySelector('#btnPedirCarta');
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

  console.log({ valor });
}

const valor = valorCarta(pedirCarta());

// Eventos:
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta();
  console.log(carta);
  puntosJugador += valorCarta(carta);
  console.log({ puntosJugador });

  puntosHTML[0].innerText = puntosJugador;

})