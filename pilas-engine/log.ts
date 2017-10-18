class Log {
  pilas: Pilas;

  constructor(pilas: Pilas) {
    this.pilas = pilas;
  }

  debug(...mensaje) {
    console.debug("DEBUG", ...mensaje);
  }

  info(...mensaje) {
    console.info("INFO", ...mensaje);
  }
}
