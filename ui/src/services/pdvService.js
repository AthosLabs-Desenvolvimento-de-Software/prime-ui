import http from './index.js';

export const check = (data, api) => {
  if (api) {
    http.defaults.baseURL = api
  }
  return http.get('pdv/check', {
    params: {
      empresa_id: data.empresa_id,
      grupo_id: data.grupo_id,
      visitor_id: data.visitor_id,
    },
  });
};

export const vincular = (data, api) => {
  if (api) {
    http.defaults.baseURL = api
  }
  return http.get('pdv/vincular', {
    params: {
      id: data.id,
      grupo_id: data.grupo_id,
      visitor_id: data.visitor_id,
    },
  });
};

export const vendas = (terminalId, type, api) => {
  if (api) {
    http.defaults.baseURL = api
  }
  return http.get(`pdv/vendas?terminal_id=${terminalId}&type=${type}`);
};

export const sales = (params, api) => {
  if (api) {
    http.defaults.baseURL = api
  }
  if (params) {
    return http.get('sales', {
      params: { ...params }
    })
  } else {
    return http.get('sales')
  }
};

export const cancelar = (id, api, estoque) => {
  if (api) {
    http.defaults.baseURL = api
  }
  if (id) {
    return http.delete(`sales/${id}`, { 
      params: { estoque } 
    })
  } else {
    return false
  }
};
