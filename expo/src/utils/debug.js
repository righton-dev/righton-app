function error() {
  if (!__DEV__) return;
  console.error(Array.prototype.join.call(arguments, ' '));
}

function log() {
  if (!__DEV__) return;
  console.log(Array.prototype.join.call(arguments, ' '));
}

function table(value) {
  if (!__DEV__) return;
  console.table(value);
}

function warn() {
  if (!__DEV__) return;
  console.warn(Array.prototype.join.call(arguments, ' '));
}

export default {
  error,
  log,
  table,
  warn,
}