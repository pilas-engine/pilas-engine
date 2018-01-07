export default function formatear(codigo) {
  return js_beautify(codigo, {
    indent_size: 2,
    indent_with_tabs: false
  });
}
