export default function jsonAString(model) {
  return btoa(JSON.stringify(JSON.parse(JSON.stringify(model))));
}
