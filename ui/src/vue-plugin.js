import BuscarVenda from "./components/BuscarVenda.vue";

const version = __UI_VERSION__;

function install(app) {
  app.component(BuscarVenda.name, BuscarVenda);
}

export { version, BuscarVenda, install };
