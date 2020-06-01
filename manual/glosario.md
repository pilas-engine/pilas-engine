---
title: Glosario de funciones
---

<script>
document.addEventListener("DOMContentLoaded", function() {
  var input = document.querySelector("#buscador");

  var timeout = null;

  function debounce(func, wait) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.call(this);  
      timeout = null;
    }, 200);
  }

  function filtrar(valor) {
    var funciones = document.querySelectorAll(".funcion");

    funciones.forEach(elemento => {

      if (elemento.firstElementChild.textContent.includes(valor)) {
        elemento.classList.remove("dn");
      } else {
        elemento.classList.add("dn");
      }

    });
  }

  input.onkeydown = function(e) {
    debounce(() => {
      filtrar(this.value);
    }, 500);
  }

});
</script>

<div class="tr">
  <input id="buscador" placeholder="Buscar ..." class="input">
</div>

<div class="funcion">
```
pilas.actores.clonar(nombre)
```

Consulta si existe un actor en la coordenada x e y. La función retorna `true` si
hay un actor en esa posición o `false` en caso negativo.

Por ejemplo:

```
❯ this.pilas.existe_actor_en(10, 10)
❮ false
```

</div>

<div class="funcion">
```
pilas.obtener_actores_en(x, y)
```

Busca actores en la coordenada `x` e `y`. Si existen actores en esa posición retornará
una lista con todas las referencias a esos actores. Y si ningún actor está en esa posición
entonces retorna una lista vacía `[]`.

Por ejemplo:

```
› pilas.obtener_actores_en(0, -94)
‹ <plataforma en (0.00, -90.00)>

› pilas.obtener_actores_en(200, 0)
‹ []
```

</div>
