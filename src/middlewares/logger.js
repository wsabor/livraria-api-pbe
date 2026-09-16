function logger(req, res, next) {
  const dataHora = new Date().toISOString(); //20260916-07:58:34
  const inicio = Date.now();

  res.on("finish", () => {
    const duracao = Date.now() - inicio;
    console.log(`[${dataHora}] ${req.method} ${req.originalUrl} - ${duracao}ms`);
  });

  next();
}

module.exports = logger;
