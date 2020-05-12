export default function convertirProyectoEmberEnDiccionarioSimple(proyecto) {
  return JSON.parse(JSON.stringify(proyecto));
}
