import http from "node:http";

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if( method === "GET" && url === "/users") {
    return response.end("List of users");
  }

  if( method === "POST" && url === "/users") {
    return response.end("Create of users");
  }

  return response.end("Hello World");
});

server.listen(3333);