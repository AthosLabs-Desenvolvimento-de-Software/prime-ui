import http from './index.js';

export const check = (data) => {
  return http.get('pdv/check', {
    params: {
      empresa_id: data.empresa_id,
      grupo_id: data.grupo_id,
      visitor_id: data.visitor_id,
    },
  });
};

export const vincular = (data) => {
  return http.get('pdv/vincular', {
    params: {
      id: data.id,
      grupo_id: data.grupo_id,
      visitor_id: data.visitor_id,
    },
  });
};

export const vendas = (terminalId, type) => {
  return http.get(`pdv/vendas?terminal_id=${terminalId}&type=${type}`);
};

export const sales = params => {
  if (params) {
    return http.get('sales', {
      params: { ...params }
    })
  } else {
    return http.get('sales')
  }
};

export const cancelar = id => {
  if (id) {
    return http.delete('sales/' + id)
  } else {
    return false
  }
};
