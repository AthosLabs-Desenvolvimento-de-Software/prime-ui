import { h } from 'vue'
import BuscarVenda from './BuscarVenda.vue'

export default {
  name: 'BuscarVenda',

  setup () {
    return () => h(BuscarVenda, {})
  }
}
