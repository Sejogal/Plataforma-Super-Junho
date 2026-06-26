const http = require("http");

const servidor = http.createServer((req, res) => {
    res.write("Olá mundo!");
    res.end();
});

servidor.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});