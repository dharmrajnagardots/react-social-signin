export const loadExternalScript = (id: string, src: string, initialize: () => void) => {
  const element = document.getElementsByTagName('script')[0];
  const fjs = element;
  let script = element;
  if (document.getElementById(id)) {
    return;
  }
  script = document.createElement('script');
  script.id = id;
  script.src = src;
  script.onload = initialize;
  script.async = true;
  fjs?.parentNode?.insertBefore(script, fjs);
};

interface StringArray {
  [index: string]: string;
}

export function parse(search: string) {
  const query = search.substring(1);
  const vars = query.split('&');
  const parsed: StringArray = {};
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (pair.length > 1) {
      parsed[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
  }
  return parsed;
}

export function generateQueryString(q: any) {
  let queryString = '';
  if (q) {
    const queryKeys = Object.keys(q);
    queryKeys.forEach((key) => {
      if (q[key]) {
        if (q[key].toString().length) {
          queryString += `${key}=${q[key]}&`;
        }
      }
    });
    if (queryKeys.length > 0 && queryString[queryString.length - 1] === '&') {
      queryString = queryString.slice(0, -1);
    }
  }
  return queryString;
}

export const getPopupPositionProperties = ({ width = 600, height = 600 }) => {
  const left = screen.width / 2 - width / 2;
  const top = screen.height / 2 - height / 2;
  return `left=${left},top=${top},width=${width},height=${height}`;
};

export const generateRandomString = (length = 20) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
