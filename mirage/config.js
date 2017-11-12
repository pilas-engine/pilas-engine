export default function() {
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get("/proyectos");
  this.post("/proyectos");
  this.get("/proyectos/:id");
  this.put("/proyectos/:id");
  this.del("/proyectos/:id");

  this.get("/escenas");
  this.post("/escenas");
  this.get("/escenas/:id");
  this.put("/escenas/:id");
  this.del("/escenas/:id");

  this.get("/actores");
  this.post("/actores");
  this.get("/actores/:id");
  this.put("/actores/:id");
  this.del("/actores/:id");
}
