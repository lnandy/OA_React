function setSessionStorage(key: string, value: any, expirationInMinutes: number = 120) {
    const now = new Date();
    const expirationTime = now.getTime() + expirationInMinutes * 60 * 1000;
    const item = {
        value: value,
        expiration: expirationTime
    };
    sessionStorage.setItem(key, JSON.stringify(item));
}

function getSessionStorage(key: string) {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiration) {
        sessionStorage.removeItem(key);
        return null;
    }
    return item.value;
}

export {setSessionStorage,getSessionStorage}