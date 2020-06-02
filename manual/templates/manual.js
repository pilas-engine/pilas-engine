var estilos = [];

if (window.location.href.includes("theme-oscuro")) {
  estilos.push(
    `
        body {color: #ccc; background-color: #3e3e3e;}
        h1, h2, h3, h4, h5 { color: white; }
        a { color: #81a7ff; }
        a:hover { color: #acc5ff; }
        .odd { background-color: #313131 !important; }
        .even { background-color: #252525 !important; }

        .input {
          letter-spacing: 0;
          border: 1px solid #333434;
          background-color: #454646;
          box-shadow: inset 0 1px rgba(0, 0, 0, 0.05);
          color: #c6c8c8;
          vertical-align: top;
          outline: 0;
          padding: 0.5em;
          font-size: 18px;
        }

        .input:focus {
          background-color: #595b5b;
          color: #fff;
          border: 1px solid #0036ff;
          box-shadow: 0 0 0 2px #6fb5f1;
        }
      `
  );
} else {
  estilos.push(`
      .input {
        border: 1px solid #aaa;
        box-shadow: inset 0 1px rgba(0, 0, 0, 0.25);
        outline: 0;
        padding: 0.5em;
        font-size: 18px;
      }

      .input:focus {
        border: 1px solid #0036ff;
        box-shadow: 0 0 0 2px #6fb5f1;
      }
    `);
}

if (window.location.href.includes("ocultar-navegacion")) {
  estilos.push(`.navegacion {display: none !important; }`);
}

// Genera un tag "style" y agrega todos los estilos personalizados.
var style = document.createElement("style");

estilos.map(estilo => {
  style.innerHTML += estilo;
});

document.head.appendChild(style);

// intercepta todos los links para que incluyan el tema oscuro si
// es necesario.
document.addEventListener("DOMContentLoaded", function() {
  if (window.location.href.includes("?")) {
    var links = document.querySelectorAll("a");
    let parametros = window.location.href.split("?")[1];

    links.forEach(link => {
      if (link.href.endsWith("html")) {
        link.href += "?" + parametros;
      }
    });
  }
});
