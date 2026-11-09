const jsonServer = require('json-server');
const express = require('express');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Porta dinâmica para o Render ou 3000 localmente
const port = process.env.PORT || 3000;

// Servir ficheiros estáticos do Front-End (HTML, CSS, JS) na pasta 'public'
server.use(express.static(path.join(__dirname, 'public')));

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.log(`▶ Servidor ativo na porta ${port}`);
    console.log(`Acesse: http://localhost:${port}/login.html`);
});
