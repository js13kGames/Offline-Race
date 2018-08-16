"use strict";

// Client code

console.log('Offline Race Client')

// Connecting to sockets server

var socket = io();

socket.on("connect", () => {
  console.log('CONNECT');
});

socket.on("disconnect", () => {
  UI.setMessage('Offline Race Client')
  console.log('DISCONNECT');
});

socket.on("wait", () => {
  UI.setMessage('wait')
});

socket.on("play", () => {
  UI.setMessage('play')
});