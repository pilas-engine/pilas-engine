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
 * - cambiar_posicion_del_modo_historia_desde_el_editor
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
 * - inicia_modo_edicion
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
 * - regresa_al_modo_editor
 * - codigo_ejecutado
 * - aplica_el_cambio_de_posicion_en_el_modo_pausa
 * - formatear
 * - formatear_y_guardar
 * - selecciona_un_actor_en_modo_pausa
 * - selecciona_la_escena_completa_en_modo_pausa
 * - abrir_selector_de_codigos
 * - ubicar_camara_en_el_actor
 * - actualizar_enumeraciones
 * - cierra_dialogo_de_animaciones
 * - capturar_pantalla
 * - captura_de_pantalla_realizada (respuesta a capturar_pantalla desde pilas)
 * - cambia_folding_en_el_editor
 *
 * Otra señal que se emite para avisarle al webserver que cambió el código es:
 *
 * - recargar_proyecto
 *
 */

export default Service.extend(Evented, {
  iniciar() {}
});
