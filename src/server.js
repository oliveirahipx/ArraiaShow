import http from 'node:http';

/*
/não aceita arrays para exibição então ira tranformar em json para exibir os
dados do array de forma correta usando o JSON.stringify() para transformar o 
array em string e exibir os dados corretamente
*/

const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
];

const server = http.createServer((req, res) => {
  const { method, url } = req;
  if(method === 'GET' && url === '/users') {
    return res.end(JSON.stringify(users));
  }
  if(method === 'POST' && url === '/users') {
    return res.end('Criacao de usuario');

  }
    return res.end('Hello World');
});

server.listen(3000);