function setLocalStorage(key: string, value: any, time?: number) {
    const now = new Date();
    const expirationTime = time ? now.getTime() + time * 3600 * 1000 : null;
    const item = {
        value: value,
        expiration: expirationTime
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getLocalStorage(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (!!item.expiration && now.getTime() > item.expiration) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}

export { setLocalStorage, getLocalStorage }
