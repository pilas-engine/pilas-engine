import { helper } from "@ember/component/helper";

export function etiqueta(params) {
  var words = params[0].split(" ");
  var results = [];

  for (var i = 0; i < words.length; i++) {
    var letter = words[i].charAt(0).toUpperCase();
    results.push(letter + words[i].slice(1));
  }

  return results.join(" ").replace(/_/g, " ");
}

export default helper(etiqueta);
