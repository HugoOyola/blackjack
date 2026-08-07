(() => {
  'use strict'

  /**
   * 2C - Two de Clubs
   * 2D - Two de Diamonds
   * 2H - Two de Heart
   * 2S - Two de Spades
   * **/

  let deck = [];
  const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];

  let puntosJugadores = [];

  // Referencia del HTML
  const btnNuevo = document.querySelector('#btnNuevoJuego'),
    btnPedir = document.querySelector('#btnPedirCarta'),
    btnDetener = document.querySelector('#btnDetener');

  const divCartasJugadores = document.querySelectorAll('.divCartas'),
    puntosHTML = document.querySelectorAll('small');

  // Función para inicializar el juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];

    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach(elem => elem.innerText = 0);
    divCartasJugadores.forEach(elem => elem.innerHTML = '');

    // Resetear botones
    btnPedir.disabled = false;
    btnDetener.disabled = false;

    // Actualizar HTML - Puntos
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

  }

  // Función para crear un nuevo deck
  const crearDeck = () => {
    deck = [];

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

    return _.shuffle(deck);
  }

  // Función para pedir una carta:
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw 'No hay cartas en el deck';
    }

    return deck.pop();
  }

  // pedirCarta();
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1;
  }

  // Turno: 0 = primer jugador y el último será la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`; //3H, JD
    imgCarta.classList.add('carta');

    divCartasJugadores[turno].append(imgCarta);
  }

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputadora] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputadora === puntosMinimos) {
        alert('Esto es un empate');
      } else if (puntosMinimos > puntosComputadora && puntosMinimos <= 21 || puntosComputadora > 21) {
        alert('Ganaste!!!');
      } else if (puntosMinimos < puntosComputadora && puntosComputadora <= 21 || puntosMinimos > 21) {
        alert('Perdiste!!!');
      }
    }, 100);
  }

  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;

    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    determinarGanador();
  }

  // const valor = valorCarta(pedirCarta());

  // Eventos:
  // btnPedir
  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

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
    turnoComputadora(puntosJugadores[0]);
  })

  // btnNuevo
  btnNuevo.addEventListener('click', () => {
    inicializarJuego();
  })
})();