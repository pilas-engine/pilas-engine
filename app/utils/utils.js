var HOST = "file://";

if (window.location.host) {
  HOST = "http://" + window.location.host;
}

export default { HOST };
