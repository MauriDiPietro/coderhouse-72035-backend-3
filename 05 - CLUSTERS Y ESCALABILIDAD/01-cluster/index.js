import express from "express";
import cluster from "cluster";
import { cpus } from "os";

const nucleos = cpus().length;

if (cluster.isPrimary) {
  console.log(`Número de núcleos disponibles: ${nucleos}`);
  console.log(`PID del proceso primario: ${process.pid}`);

  for (let i = 0; i < nucleos; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code) => {
    console.log(
      `El worker ${worker.process.pid} ha finalizado con el código ${code}`
    );
    cluster.fork();
  });
} else {
  const app = express();
  const PORT = 8080;

  app.get("/operacion-simple", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 10000; i++) {
      sum += i;
    }
    res.json({ sum, pid: process.pid, isWorker: cluster.isWorker });
  });

  app.get("/operacion-compleja", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 5000000000; i++) {
      sum += i;
    }
    res.json({ sum, pid: process.pid, isWorker: cluster.isWorker });
  });

  app.get('/dead', (req, res) => {
    res.json({ message: 'Este worker morirá' });
    process.exit(1);
  });

  app.listen(PORT, () =>
    console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER: ${process.pid}`)
  );
}
