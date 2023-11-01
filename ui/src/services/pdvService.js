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

export const vendas = (terminalId) => {
  return http.get(`pdv/vendas?terminal_id=${terminalId}`);
};
