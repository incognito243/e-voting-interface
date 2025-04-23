import CryptoJS from "crypto-js";

export function generateSignature(paramsObject: Record<string, string | number>, secret: string): string {
  const queryString = Object.keys(paramsObject)
    .sort()
    .map((key) => `${key}=${paramsObject[key]}`)
    .join('&');

  return CryptoJS.HmacSHA256(queryString, secret).toString();
}

export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}