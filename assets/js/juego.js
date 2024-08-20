/**
 * 2C - Dos de Corazones
 * 2D - Dos de Diamantes
 * 2H - Dos de Tréboles
 * 2S - Dos de Picas
 * **/

let deck = [];

const dia = 6;
const horaActual = 9;

let horaApertura;
let mensaje;

horaApertura = ([0,6].includes(dia)) ? 9 : 11;
mensaje = (horaActual >= horaApertura) ? 'Esta abierto' : `Esta cerrado, hoy abrimos a las ${horaApertura}`;

console.log({horaApertura, mensaje});