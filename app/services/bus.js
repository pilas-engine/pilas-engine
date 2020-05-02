import Evented from "@ember/object/evented";
import Service from "@ember/service";

/*
 * Este servicio permite mantener en comunicación varias partes del sistema
 * de pilas, principalmente pilas-canvas y sus componentes cercanos.
 *
 * Estas son las señales que se emiten desde aquí.
 *
 * - actualizar_actor_desde_el_editor
 * - actualizar_escena_desde_el_editor
 * - cambiar_posicion_desde_el_editor
 * - cargar_escena
 * - comienza_a_mover_un_actor
 * - cuando_cambia_posicion_dentro_del_modo_pausa
 * - cuando_termina_de_iniciar_ejecucion
 * - ejecutar_proyecto
 * - eliminar_actor_desde_el_editor
 * - error
 * - finaliza_carga
 * - finaliza_carga_de_recursos
 * - hacerFocoEnElEditor
 * - hacer_foco_en_pilas
 * - inicia_modo_depuracion_en_pausa
 * - pausar_escena
 * - progreso_de_carga
 * - pulsa_la_tecla_escape
 * - quitar_pausa
 * - se_actualiza_el_log
 * - selecciona_actor_desde_el_editor
 * - termina_de_mover_un_actor
 * - mientras_mueve_la_camara
 * - expandir_codigo
 * - duplicar_el_actor_seleccionado
 *
 * Otra señal que se emite para avisarle al webserver que cambió el código es:
 *
 * - recargar_proyecto
 *
 */

export default Service.extend(Evented, {
  iniciar() {}
});
