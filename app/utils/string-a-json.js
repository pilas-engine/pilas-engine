export default function stringAJson(model) {
  return JSON.parse(atob(model));
}
