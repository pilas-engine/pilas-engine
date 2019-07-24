import Component from "@ember/component";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

// recetas de actores
import reproducir_sonido_al_comenzar from "pilas-engine/utils/recetas/actor/reproducir-sonido-al-comenzar";
import detecta_el_paso_del_tiempo_en_segundos from "pilas-engine/utils/recetas/actor/detecta-el-paso-del-tiempo-en-segundos";
import cuando_colisiona_emitir_mensaje from "pilas-engine/utils/recetas/actor/cuando-colisiona-emitir-mensaje";
import cuando_colisiona_eliminar_al_otro_actor from "pilas-engine/utils/recetas/actor/cuando-colisiona-eliminar-al-otro-actor";
import mover_al_actor_a_la_izquierda from "pilas-engine/utils/recetas/actor/mover-al-actor-a-la-izquierda";
import clonar_cuando_hacen_click_sobre_el_actor from "pilas-engine/utils/recetas/actor/clonar-cuando-hacen-click-sobre-el-actor";
import controlar_al_actor_como_si_fuera_un_automovil from "pilas-engine/utils/recetas/actor/controlar-al-actor-como-si-fuera-un-automovil";
import saltar_o_impulsar_cuando_hacen_click from "pilas-engine/utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click";
import saltar_o_impulsar_cuando_hacen_click_en_la_pantalla from "pilas-engine/utils/recetas/actor/saltar-o-impulsar-cuando-hacen-click-en-la-pantalla";
import controlar_el_movimiento_del_actor from "pilas-engine/utils/recetas/actor/controlar-el-movimiento-del-actor";
import cambiar_la_posicion_del_actor_al_azar from "pilas-engine/utils/recetas/actor/cambiar-la-posicion-del-actor-al-azar";

// recetas de escenas
import crear_actores_cada_determinado_tiempo_en_segundos from "pilas-engine/utils/recetas/escena/crear-actores-cada-determinado-tiempo-en-segundos";
import crear_actor_en_la_posicion_en_donde_se_hace_click from "pilas-engine/utils/recetas/escena/crear-actor-en-la-posicion-en-donde-se-hace-click";
import observar_el_movimiento_del_mouse_o_cursor from "pilas-engine/utils/recetas/escena/observar-el-movimiento-del-mouse-o-cursor";
import crear_10_actores_en_posiciones_al_azar_cuando_comienza from "pilas-engine/utils/recetas/escena/crear-10-actores-en-posiciones-al-azar-cuando-comienza";
import crear_copias_de_un_actor_cada_determinado_tiempo from "pilas-engine/utils/recetas/escena/crear-copias-de-un-actor-cada-determinado-tiempo";

export default Component.extend({
  tagName: "",
  mostrar: false,
  bus: service(),

  recetas_filtradas_por_tipo: computed("tipo_de_la_instancia_seleccionada", "recetas", function() {
    return this.recetas.filterBy("para", this.tipo_de_la_instancia_seleccionada).sortBy("titulo");
  }),

  es_proyecto: computed("tipo_de_la_instancia_seleccionada", function() {
    return this.tipo_de_la_instancia_seleccionada === "proyecto";
  }),

  didInsertElement() {
    this._super(...arguments);
    this.set("recetas", [
      // recetas de actores
      detecta_el_paso_del_tiempo_en_segundos(),
      cuando_colisiona_emitir_mensaje(),
      cuando_colisiona_eliminar_al_otro_actor(),
      mover_al_actor_a_la_izquierda(),
      controlar_el_movimiento_del_actor(),
      clonar_cuando_hacen_click_sobre_el_actor(),
      controlar_al_actor_como_si_fuera_un_automovil(),
      saltar_o_impulsar_cuando_hacen_click(),
      saltar_o_impulsar_cuando_hacen_click_en_la_pantalla(),
      cambiar_la_posicion_del_actor_al_azar(),
      reproducir_sonido_al_comenzar(),

      // recetas de escenas
      crear_actores_cada_determinado_tiempo_en_segundos(),
      crear_actor_en_la_posicion_en_donde_se_hace_click(),
      observar_el_movimiento_del_mouse_o_cursor(),
      crear_10_actores_en_posiciones_al_azar_cuando_comienza(),
      crear_copias_de_un_actor_cada_determinado_tiempo()
    ]);
  },

  actions: {
    ocultar() {
      this.set("mostrar", false);
    },

    mostrar() {
      this.set("mostrar", true);
    },

    usar_receta(receta) {
      this.bus.trigger("usar_receta", receta);
      this.send("ocultar");
    }
  }
});
