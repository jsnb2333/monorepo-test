export function genMessage(langs) {
  const obj = {};

  Object.entries(langs).map(([key, value]) => {
    const langFileModule = value.default;
    let objKey = key
      .split('/')
      .find((item) => /\.json/.test(item))
      .replace(/\.json/, '');
    if (!obj[objKey]) {
      obj[objKey] = {};
      obj[objKey] = langFileModule;
    } else {
      obj[objKey] = langFileModule;
    }
  });

  return obj;
}

export function getI18nLocal() {
  var str = localStorage.getItem('i18n');
  if (typeof str === 'string') {
    setHtmlPageLang(str);
    return str;
  } else {
    const local = import.meta.env.VITE_I18N;
    setI18nLocal(local);
    return local;
  }
}

export function setI18nLocal(local) {
  setHtmlPageLang(local);
  localStorage.setItem('i18n', local);
}

export function setHtmlPageLang(local) {
  document.querySelector('html')?.setAttribute('lang', local);
}
