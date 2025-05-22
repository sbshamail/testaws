export const persistance = (parentKey = "nextpersist") => {
  const ls = {
    set: function (key, value, pkey = parentKey) {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem(pkey);
        let data = storedData ? JSON.parse(storedData) : {};
        data[key] = JSON.stringify(value);
        localStorage.setItem(pkey, JSON.stringify(data));
      }
    },
    get: function (key, pkey = parentKey) {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem(pkey);
        if (!storedData) return null;
        const data = JSON.parse(storedData);
        return data[key] ? JSON.parse(data[key]) : null;
      }
      return null;
    },
    getAll: function (pkey = parentKey) {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem(pkey);
        if (!storedData) return null;
        const data = JSON.parse(storedData);
        Object.keys(data).forEach((key) => {
          data[key] = JSON.parse(data[key]);
        });
        ls.data = data;
        return data;
      }
      return null;
    },
    delete: function (key, pkey = parentKey) {
      if (typeof window !== "undefined") {
        const storedData = localStorage.getItem(pkey);
        if (!storedData) return;
        const data = JSON.parse(storedData);
        delete data[key];
        localStorage.setItem(pkey, JSON.stringify(data));
      }
    },
    deleteAll: function (pkey = parentKey) {
      if (typeof window !== "undefined") {
        return localStorage.removeItem(pkey);
      }
    },
    clear: function () {
      if (typeof window !== "undefined") {
        return localStorage.clear();
      }
    },
  };
  return ls;
};

export const ls = persistance("nextpersist");
