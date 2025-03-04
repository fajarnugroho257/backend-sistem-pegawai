const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Lanjut ke middleware berikutnya atau handler
};

module.exports = logger;
