import Controller from "@ember/controller";

export default Controller.extend({
  queryParams: ["livereload", "pixelart"],
  livereload: false,
  pixelart: true
});
