import Service from "@ember/service";

export default Service.extend({
  enElectron: false,

  iniciar() {
    if (window.enElectron) {
      this.set("enElectron", true);
    }
  },

  abrirInspector() {
    requireNode("electron")
      .remote.getCurrentWindow()
      .toggleDevTools();
  },

  abrir_en_un_navegador(url) {
    const { shell } = requireNode("electron");
    alert(url);
    shell.openExternal(url);
  }
});
