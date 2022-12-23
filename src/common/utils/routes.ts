export const isValidJSON = (json: string) => {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
};

export const buildPathUrl = (path: string) => {
  const url = new URL(path, window.location.origin);
  let baseUrl = url.pathname.endsWith('/')
    ? url.pathname.slice(0, url.pathname.length - 1)
    : url.pathname;
  baseUrl = baseUrl.startsWith('/') ? baseUrl : `/${baseUrl}`;

  return baseUrl;
};
