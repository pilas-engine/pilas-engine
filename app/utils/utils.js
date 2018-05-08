var HOST = "file://";

if (window.location.host) {
  HOST = "http://" + window.location.host;
  console.log({ HOST, origin: window.location.origin });
}

export default { HOST };
