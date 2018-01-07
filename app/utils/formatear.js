export default function formatear(codigo) {
  return js_beautify(codigo.trim(), {
    indent_size: 2,
    indent_with_tabs: false,
    max_preserve_newlines: 2,
    preserve_newlines: true
  });
}
