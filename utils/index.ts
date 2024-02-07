// "use client";

// export function getItemWithExpiration(key: string) {
//   const itemStr = localStorage.getItem(key);
//   if (!itemStr) {
//     return null;
//   }
//   const item = JSON.parse(itemStr);
//   const now = new Date();
//   if (now.getTime() > item.expiry) {
//     localStorage.removeItem(key);
//     return null;
//   }
//   return item.value;
// }

// export function setItemWithExpiration(key: string, value: any, ttl: number) {
//   const now = new Date();
//   const item = {
//     value: value,
//     expiry: now.getTime() + ttl,
//   };
//   localStorage.setItem(key, JSON.stringify(item));
// }

// export const deleteStorage = (key: string) => {
//   localStorage.removeItem(key);
// };

import Cookies from "js-cookie";

interface CookieItem {
  value: any;
  expiry: number;
}

export function setItemWithExpiration(
  key: string,
  value: any,
  ttl: number
): void {
  const now = new Date();
  const item: CookieItem = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  // Cookies.set accepts a string for the value, so we need to stringify our object
  Cookies.set(key, JSON.stringify(item), {
    expires: new Date(now.getTime() + ttl),
  });
}

export function getItemWithExpiration(key: string): any | null {
  const itemStr = Cookies.get(key);
  if (!itemStr) {
    return null;
  }
  const item: CookieItem = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    Cookies.remove(key); // Remove the cookie if it's expired
    return null;
  }
  return item.value;
}

export const deleteStorage = (key: string): void => {
  Cookies.remove(key);
};
