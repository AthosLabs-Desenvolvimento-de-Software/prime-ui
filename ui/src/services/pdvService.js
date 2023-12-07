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

export const sales = data => {
  if (data) {
    return http.get('sales', {
      params: {
        terminal_id: data?.idTerminal,
        search: data?.filter || '',
        page: data?.pagination?.page || 1,
        rowsPerPage: data?.pagination?.rowsPerPage,
        sortBy: data?.pagination?.sortBy || '',
        descending: data?.pagination?.descending || false,
        exactBy: data?.exactBy || ''
      }
    })
  } else {
    return http.get('sales')
  }
};
