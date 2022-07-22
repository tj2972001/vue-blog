export function checkAndParseLocalStorageStr(key, val) {
  // If the item is not already in localStorage, first set it
  console.log("val before ", val);
  if (!window.localStorage.getItem(key)) {
    console.log("Didnt found localStorage with key ", key);
    window.localStorage.setItem(key, JSON.stringify(val));
  }
  console.log("val ", JSON.parse(window.localStorage.getItem(key)));
  return { ...JSON.parse(window.localStorage.getItem(key)) };
}
