import BuscarVenda from "./components/BuscarVenda.vue";
import TestComponent from "./components/QTestComponent.vue";
import pkg from '../package.json'

const { version } = pkg

function install(app) {
  app.component('BuscarVenda', BuscarVenda);
  app.component('TestComponent', TestComponent);
}

export { version, TestComponent, install };
