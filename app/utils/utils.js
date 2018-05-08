var HOST = "file://";

if (window.location.origin) {
  HOST = window.location.origin;
}

export default { HOST };
