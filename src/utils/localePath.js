const routeNames = {
  "/": "",
  "/AllCharactersLore": "/characters",
  "/Rules": "/rules",
  "/Team": "/team",
  "/ContactUs": "/contact",
};

export function getLocalizedPath(pathname, language) {
  const withoutLocale = pathname.replace(/^\/(en|el)(?=\/|$)/, "") || "/";
  const route = routeNames[withoutLocale] || withoutLocale.toLowerCase();
  return `/${language}${route}`;
}

export function getLanguageFromPath(pathname) {
  const language = pathname.match(/^\/(en|el)(?=\/|$)/)?.[1];
  return language || null;
}