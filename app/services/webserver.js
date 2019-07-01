import Service from "@ember/service";
import { Promise } from "rsvp";
import { inject as service } from "@ember/service";
import base64_encode from "../utils/base64-encode";
import proyecto_inicial_webserver from "../fixtures/proyecto-inicial-webserver";

/**
 * Este servicio se encarga de levantar un servidor web para presentar
 * el juego realizado en un dispositivo externo.
 *
 * El servidor web entrega un archivo index.html con acceso a las imágenes
 * y recursos de pilas. Además, en el mismo index.html hay un temporizador
 * que consulta la ruta "/tick" para darse cuenta si tiene que recargar la
 * escena o no.
 *
 * Este temporizador lo agregué porque mi intensión es que el usuario no solo
 * pueda ver su juego sino verlo recargarse automáticamente cada vez que
 * ejecuta el proyecto en el editor. Algo simila a como hace unity remote.
 *
 * Internamente, el editor se comunica con este servidor usando al señal
 * del bus "recargar_proyecto". Esta señal actualiza el código del proyecto
 * (enviado desde el editor a este servicio) y renueva los datos que entrega
 * la ruta "/tick" para que el temporizador refresque el navegador o
 * directamente recargue el proyecto.
 */
export default Service.extend({
  app: null,
  tick: null,
  proyecto_serializado: undefined,
  bus: service(),

  /*
   * Los datos que genera este método se consultan desde un temporizador
   * en el dispositivo remoto. Si el tick enviado es diferente al que
   * leyó previamente el cliente debe actualizar. El atributo "recargarTodo"
   * le indica al cliente si tiene que recargar la página completa o
   * simplemente cargar el proyecto rápido.
   */
  generar_tick(recargar) {
    recargar = recargar || false;
    this.set("tick", Math.random() * 5000);
    this.set("recargarTodo", recargar);
  },

  obtener_ip() {
    return new Promise(function(resolve, reject) {
      let dns = requireNode("dns");
      let os = requireNode("os");

      dns.lookup(os.hostname(), function(err, ip) {
        if (err) {
          return reject(err);
        }

        return resolve(ip);
      });
    });
  },

  obtener_tick() {
    let proyecto = this.obtener_codigo_del_proyecto();
    return { tick: this.tick, recargarTodo: this.recargarTodo, proyecto };
  },

  detener_servidor() {
    this.app.server.close();
    this.set("app", null);
    this.bus.off("recargar_proyecto", this, "recargar_proyecto");
  },

  generar_proyecto_inicial() {
    let proyecto = proyecto_inicial_webserver;
    this.set("proyecto_serializado", base64_encode(proyecto));
  },

  iniciar_servidor(puerto) {
    this.bus.on("recargar_proyecto", this, "recargar_proyecto");

    this.generar_proyecto_inicial();
    this.generar_tick(false);

    return new Promise((resolve, reject) => {
      if (this.app) {
        throw Error("El servidor ya se había inicializado");
      }

      const polka = requireNode("polka");
      const ruta = this.obtener_directorio_de_recursos();
      const serve = requireNode("sirv")(ruta, {
        extensions: []
      });

      let app = polka()
        .use(serve)
        .get("/", (req, res) => {
          res.end(this.obtener_pagina_principal());
        })
        .get("/tick", (req, res) => {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });
          let json = JSON.stringify(this.obtener_tick());
          res.end(json);
        })
        .listen(puerto, err => {
          if (err) {
            reject(err);
          } else {
            this.obtener_ip().then(ip => {
              resolve(`${ip}:${puerto}`);
            });
          }
        });

      this.set("app", app);
    });
  },

  obtener_directorio_de_recursos() {
    const fs = requireNode("fs");

    if (fs.existsSync("public")) {
      return "public";
    } else {
      if (window.enElectron) {
        return requireNode("electron").remote.app.getAppPath();
      } else {
        return "./";
      }
    }
  },

  obtener_pagina_principal() {
    let codigo_live_reload = this.obtener_codigo_live_reload();
    let codigo_de_style = this.obtener_codigo_de_style();
    let codigo_de_pilas = this.obtener_codigo_de_pilas();

    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script>
          var proyecto_serializado_inicial = "${this.obtener_codigo_del_proyecto()}";
        </script>

        <script>
          ${codigo_live_reload}
        </script>

        <style>
          ${codigo_de_style}
        </style>

        <script src="phaser.js"></script>
        <script src="nineslice.js"></script>
        <script src="pilas-engine.js"></script>
      </head>

      <body>
        <script>

          function b64DecodeUnicode(str) {
            return decodeURIComponent(atob(str).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
          }

        </script>

        <div id="game"></div>

        <script>
          ${codigo_de_pilas}
        </script>
      </body>

    </html>
    `;
  },

  obtener_codigo_de_style() {
    return `
      * {
        padding: 0;
        margin: 0;
      }

      html,
      body {
        height: 100%;
      }

      body {
        overflow: hidden;
      }

      #game {
        width: 100%;
        height: 100%;
        background-color: #424242;
        text-align: center;
      }

      .dn {
        display: none;
      }

      canvas {
        width: auto;
        max-height: 100%;
        max-width: 100%;
        object-fit: contain;
        margin-left: 0 !important;
      }
    `;
  },

  recargar_proyecto(datos, debe_hacer_hard_refesh) {
    this.set("proyecto_serializado", datos);
    this.generar_tick(debe_hacer_hard_refesh);
  },

  obtener_codigo_del_proyecto() {
    return this.proyecto_serializado;
  },

  obtener_codigo_de_pilas() {
    return `
      var ha_iniciado = false;

      var proyecto = JSON.parse(b64DecodeUnicode(proyecto_serializado_inicial));
      var pilas = pilasengine.iniciar(proyecto.proyecto.ancho*1, proyecto.proyecto.alto);

      pilas.onready = function() {
        if (!ha_iniciado) {
          ha_iniciado = true;
          proyecto.pilas = pilas;
          pilas.definir_modo("ModoEjecucion", proyecto);
        }
      }
    `;
  },

  obtener_codigo_live_reload() {
    return `
        let tickAnterior = null;

        function get(url) {
          return new Promise((resolve, reject) => {
            var request = new XMLHttpRequest();

            request.onreadystatechange = function() {
              if (request.readyState === 4) {
                if (request.status === 200) {
                  resolve(JSON.parse(request.responseText));
                } else {
                  reject("error: " + request.statusText);
                }
              }
            }

            request.open('GET', url);
            request.send();
          });
        }


        window.fetch = null;

        function consultar_tick() {
          console.log("Consultando tick para saber si deber actualizar página...");

          get("/tick").then((data) => {
            if (tickAnterior) {
              if (tickAnterior !== data.tick) {
                console.log("El tick ha cambiando, reiniciando");

                if (data.recargarTodo) {
                  console.log("Es un hard refresh!!!");

                  setTimeout(function() {
                      window.location.reload();
                  }, 200);

                } else {
                  console.log({tickAnterior, tick: data.tick})
                  tickAnterior = data.tick;
                  console.log("Es una actualización rápida...");

                  pilas.escena.terminar();

                  let t = pilas.actores.texto()
                  t.texto = "Reiniciando ...";
                  t.color = "white";

                  setTimeout(function() {
                    var proyecto = JSON.parse(b64DecodeUnicode(data.proyecto));
                    console.log(proyecto);

                    proyecto.pilas = pilas;
                    pilas.definir_modo("ModoEjecucion", proyecto);
                  }, 500)

                }

                if (data.recargarTodo) {
                  return null;
                }

              }
            } else {
              // Se ejecuta por primera vez
              tickAnterior = data.tick;
            }

            planificar_consulta_de_tick();
          }).catch(error => {
            console.error('Falló obtener el tick más reciente, volviendo a intentar...');
            planificar_consulta_de_tick();
          })

        }

        function planificar_consulta_de_tick() {
          setTimeout(consultar_tick, 2000);
        }

        consultar_tick();
    `;
  }
});
