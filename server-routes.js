import { Router } from "express";

export const router = Router();

const clients = new Set();
let counter = 0;

router.post("/increment", (req, res) => {
  const value = parseInt(req.body.value);

  counter += value;
  clients.forEach((client) => {
    client.write(counter.toString());
  });

  res.send({ status: "OK", counter });
});

router.post("/decrement", (req, res) => {
  const value = parseInt(req.body.value);

  counter -= value;
  clients.forEach((client) => {
    client.write(counter.toString());
  });

  res.send({ status: "OK", counter });
});

router.get("/stream", (req, res) => {
  res.setHeader("Content-Type", "application/text");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  res.write(counter.toString());

  clients.add(res);

  req.on("close", () => {
    clients.delete(res);
  });
});
