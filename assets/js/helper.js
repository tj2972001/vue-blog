export function getLocalStorage(key) {
  console.log("localStorage.getItem(key): ", localStorage.getItem(key));
  if (!JSON.parse(localStorage.getItem(key))) {
    console.log("RETURNING NULL");
    return null;
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

export function setLocalStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
