// global.d.ts
interface Window {
    setSessionStorage: (key: string, value: any, expirationInMinutes: number) => void;
    getSessionStorage: (key: string) => any;
}
