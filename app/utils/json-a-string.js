export default function jsonAString(model) {
  let str = JSON.stringify(model);
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
      return String.fromCharCode("0x" + p1);
    })
  );
}
