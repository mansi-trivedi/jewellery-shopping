type CookieType = {
  [cookieName: string]: "string";
};

const parseCookies = (cookieString: string): CookieType => {
  const cookies = {} as CookieType;

  if (cookieString) {
    cookieString.split(";").forEach((cookie) => {
      const parts = cookie.split("=");
      const name = parts[0].trim();
      const value = parts[1] ? parts[1].trim() : "";
      cookies[name] = value as "string";
    });
  }

  return cookies;
};

export { parseCookies };
