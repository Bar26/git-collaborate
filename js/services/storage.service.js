export const storageService = {
    save: saveStorage,
    load: loadStorage
}

function saveStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}

function loadStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}
